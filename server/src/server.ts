require('honeycomb-beeline')({
  writeKey: process.env.HONEYCOMB_KEY || '2384210fb8a56f3cd0e6ca4d60610f3a',
  dataset: process.env.APP_NAME || 'EventWorks',
  serviceName: process.env.APPSERVER_TAG || 'local',
  enabledInstrumentations: ['express', 'mysql2', 'react-dom/server'],
  sampleRate: 10,
})

import assert from 'assert'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { json, raw, RequestHandler, static as expressStatic } from 'express'
import { getOperationAST, parse as parseGraphql, specifiedRules, subscribe as gqlSubscribe, validate } from 'graphql'
import { GraphQLServer } from 'graphql-yoga'
import { forAwaitEach, isAsyncIterable } from 'iterall'
import path from 'path'
import 'reflect-metadata'
import { v4 as uuidv4 } from 'uuid'
import { checkEqual, Unpromise } from '../../common/src/util'
import { initBackgroundProcesses } from './background'
import { Config } from './config'
import { migrate } from './db/migrate'
import { initORM } from './db/sql'
import { Session } from './entities/Session'
import { User } from './entities/User'
import { getSchema, graphqlRoot, pubsub } from './graphql/api'
import { ConnectionManager } from './graphql/ConnectionManager'
import { createChatMessageLoader, createEventLoader, createTableLoader, createUserLoader } from './graphql/dataloader'
import { UserType } from './graphql/schema.types'
import { expressLambdaProxy } from './lambda/handler'
import { renderApp } from './render'

const Redis = require('ioredis')
const my_redis = new Redis()

const server = new GraphQLServer({
  typeDefs: getSchema(),
  resolvers: graphqlRoot as any,
  context: ctx => ({
    ...ctx,
    pubsub,
    redis: my_redis,
    user: (ctx.request as any)?.user || null,
    chatMessageLoader: createChatMessageLoader(),
    userLoader: createUserLoader(),
    tableLoader: createTableLoader(),
    eventLoader: createEventLoader()
  }),
})

server.express.use(cookieParser())
server.express.use(json())
server.express.use(raw())
server.express.use('/app', cors(), expressStatic(path.join(__dirname, '../../public')))

const asyncRoute = (fn: RequestHandler) => (...args: Parameters<RequestHandler>) =>
  fn(args[0], args[1], args[2]).catch(args[2])

server.express.get('/', (req, res) => {
  console.log('GET /')
  res.redirect('/app')
})

server.express.get('/app/*', (req, res) => {
  console.log('GET /app')
  renderApp(req, res, server.executableSchema)
})

const SESSION_DURATION = 30 * 24 * 60 * 60 * 1000 // 30 days

server.express.post(
  '/auth/createUser',
  asyncRoute(async (req, res) => {
    console.log('POST /auth/createUser')
    // create User model with data from HTTP request
    let user = new User()
    user.email = req.body.email
    user.name = req.body.name
    user.title = req.body.title
    user.linkedinLink = req.body.linkedinLink
    user.userType = UserType.User

    // save the User model to the database, refresh `user` to get ID
    user = await user.save()

    const authToken = await createSession(user)
    res
      .status(200)
      .cookie('authToken', authToken, { maxAge: SESSION_DURATION, path: '/', httpOnly: true, secure: Config.isProd })
      .send('Success!')
  })
)

server.express.post(
  '/auth/login',
  asyncRoute(async (req, res) => {
    console.log('POST /auth/login')
    const email = req.body.email
    const password = req.body.password

    const user = await User.findOne({ where: { email } })
    if (!user || password !== Config.adminPassword) {
      res.status(403).send('Forbidden')
      return
    }

    await Session.delete({ user })
    const authToken = await createSession(user)

    res
      .status(200)
      .cookie('authToken', authToken, { maxAge: SESSION_DURATION, path: '/', httpOnly: true, secure: Config.isProd })
      .send('Success!')
  })
)

async function createSession(user: User): Promise<string> {
  const authToken = uuidv4()

  const session = new Session()
  session.authToken = authToken
  session.user = user
  await Session.save(session).then(s => console.log('saved session ' + s.id))

  return authToken
}

server.express.post(
  '/auth/logout',
  asyncRoute(async (req, res) => {
    console.log('POST /auth/logout')
    const authToken = req.cookies.authToken
    if (authToken) {
      await Session.delete({ authToken })
    }
    res.status(200).cookie('authToken', '', { maxAge: 0 }).send('Success!')
  })
)

server.express.get(
  '/api/:function',
  asyncRoute(async (req, res) => {
    console.log(`GET ${req.path}`)
    const { statusCode, headers, body } = await expressLambdaProxy(req)
    res
      .status(statusCode)
      .contentType(String(headers?.['Content-Type'] || 'text/plain'))
      .send(body)
  })
)

server.express.post(
  '/api/:function',
  asyncRoute(async (req, res) => {
    console.log(`POST ${req.path}`)
    const { statusCode, headers, body } = await expressLambdaProxy(req)
    res
      .status(statusCode)
      .contentType(String(headers?.['Content-Type'] || 'text/plain'))
      .send(body)
  })
)

server.express.post('/graphqlsubscription/connect', (req, res) => {
  console.log('POST /graphqlsubscription/connect')
  ConnectionManager.connect(req)
  res.status(200).header('Sec-WebSocket-Protocol', 'graphql-ws').send('')
})

server.express.post('/graphqlsubscription/connection_init', (req, res) => {
  console.log('POST /graphqlsubscription/connection_init')
  res.status(200).send(JSON.stringify({ type: 'connection_ack' }))
})

server.express.post(
  '/graphqlsubscription/start',
  asyncRoute(async (req, res) => {
    console.log('POST /graphqlsubscription/start')
    const connId = ConnectionManager.getConnId(req)

    const { id, payload } = req.body
    // If we already have a subscription with this id, unsubscribe from it first.
    ConnectionManager.endSubscription(connId, id)

    const { query, variables, operationName } = payload
    const document = parseGraphql(query)
    const operationAST = getOperationAST(document, operationName)
    checkEqual(
      'subscription',
      operationAST?.operation,
      'expected a subscription graphql operation, got: ' + operationAST?.operation
    )

    let subscription: Unpromise<ReturnType<typeof gqlSubscribe>>
    try {
      const validationErrors = validate(server.executableSchema, document, [...specifiedRules])
      if (validationErrors.length > 0) {
        throw {
          errors: validationErrors,
        }
      }

      subscription = await gqlSubscribe({
        contextValue: { pubsub },
        document,
        operationName,
        rootValue: graphqlRoot,
        schema: server.executableSchema,
        variableValues: variables,
      })
    } catch (e) {
      if (e.errors) {
        await ConnectionManager.send(connId, JSON.stringify({ id, type: 'data', payload: { errors: e.errors } }))
      } else {
        await ConnectionManager.send(connId, JSON.stringify({ id, type: 'error', payload: { message: e.message } }))
      }

      // Remove the operation on the server side as it will be removed also in the client.
      ConnectionManager.endSubscription(connId, id)
      throw e
    }

    assert.ok(isAsyncIterable(subscription))
    ConnectionManager.registerSubscription(connId, id, subscription)

    forAwaitEach(subscription, payload => ConnectionManager.send(connId, JSON.stringify({ id, type: 'data', payload })))
      .then(() => ConnectionManager.send(connId, JSON.stringify({ id, type: 'complete' })))
      .catch((e: Error) => {
        let error = e
        if (Object.keys(error).length === 0) {
          // plain Error object cannot be JSON stringified.
          error = { name: error.name, message: error.message }
        }
        return ConnectionManager.send(connId, JSON.stringify({ id, type: 'error', payload: error }))
      })

    res.status(200).send('')
  })
)

server.express.post('/graphqlsubscription/stop', (req, res) => {
  console.log('POST /graphqlsubscription/stop')
  const connId = ConnectionManager.getConnId(req)
  const { id } = req.body
  ConnectionManager.endSubscription(connId, id)
  res.status(200).send('')
})

server.express.post('/graphqlsubscription/disconnect', (req, res) => {
  console.log('POST /graphqlsubscription/disconnect')
  ConnectionManager.disconnect(req)
  res.status(200).send('')
})

server.express.post(
  '/graphql',
  asyncRoute(async (req, res, next) => {
    const authToken = req.cookies.authToken || req.header('x-authtoken')
    if (authToken) {
      const session = await Session.findOne({ where: { authToken }, relations: ['user'] })
      if (session) {
        const reqAny = req as any
        reqAny.user = session.user
      }
    }
    next()
  })
)

initORM()
  .then(() => migrate())
  .then(() =>
    server.start(
      {
        port: Config.appserverPort,
        endpoint: '/graphql',
        subscriptions: '/graphqlsubscription',
        playground: '/graphql',
      },
      () => {
        console.log(`server started on http://localhost:${Config.appserverPort}/`)
      }
    )
  )
  .catch(err => console.error(err))

initBackgroundProcesses({redis: my_redis})