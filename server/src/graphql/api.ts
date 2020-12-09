import DataLoader from 'dataloader'
import { readFileSync } from 'fs'
import { GraphQLScalarType, Kind } from 'graphql'
import { PubSub } from 'graphql-yoga'
import path from 'path'
import { check } from '../../../common/src/util'
import { ChatMessage } from '../entities/ChatMessage'
import { Event } from '../entities/Event'
import { EventTable } from '../entities/EventTable'
import { Survey } from '../entities/Survey'
import { SurveyAnswer } from '../entities/SurveyAnswer'
import { SurveyQuestion } from '../entities/SurveyQuestion'
import { User } from '../entities/User'
import { Resolvers } from './schema.types'

export const pubsub = new PubSub()

export function getSchema() {
 const schema = readFileSync(path.join(__dirname, 'schema.graphql'))
 return schema.toString()
}

interface Context {
 user: User | null
 request: Request
 response: Response
 pubsub: PubSub
 chatMessageLoader: DataLoader<number, ChatMessage>
 userLoader: DataLoader<number, User>
 tableLoader: DataLoader<number, EventTable>
}

const DEFAULT_USER_CAPACITY = 10
const DEFAULT_TAKE_AMOUNT = 20
const TABLE_LIMIT_PER_EVENT = 16 // 15 + main room

export const graphqlRoot: Resolvers<Context> = {
  Query: {
    self: (_, args, ctx) => ctx.user,
    usersAtTable: async (_, { tableId }, ctx) => check(await User.find({ where: { table: { id: tableId } } })),
    user: async (_, {userId}, ctx) => check (await User.findOne({ where: { id : userId } })),
    users: async (_, args, ctx) => check(await User.find()),
    survey: async (_, { surveyId }) => (await Survey.findOne({ where: { id: surveyId } })) || null,
    surveys: () => Survey.find(),
    chatMessages: async (root, { eventId, tableId, offset }, context) => await ChatMessage.find({
      where: {
        event: check(await Event.findOne({ where: { id: eventId } })),
        table: check(await EventTable.findOne({ where: { id: tableId } }))
      },
      order: { timeSent: 'DESC' },
      skip: offset,
      take: DEFAULT_TAKE_AMOUNT
    }).then(messages => messages.reverse()),
    events: async (_, {}, ctx) => (await Event.find()),
    event: async (_, { eventId, userId }, ctx) => {
      const event = check(await Event.findOne({ where: { id: eventId }, relations: ['host'] }))
      if (userId !== event.host.id) {
        return { ...event, host: null }
      }
      return event
    },
    table: async (_, { tableId }, ctx) => check(await EventTable.findOne({ where: { id: tableId } }))
  },
  Mutation: {
    ping: (_, { userId }, ctx) => {
      console.log('ping', userId)
      return "ok"
    },
    updateUser: async (_, { input }, ctx) => {
      const user = check(await User.findOne({where: {id: input.id}}))
      user.name = input.name || user.name
      user.email = input.email || user.email
      user.linkedinLink = input.linkedinLink || user.linkedinLink
      await user.save()
      return user
    },
    createEvent: async (_, { input }, ctx) => {
      const newEvent = new Event()
      const host = check(await User.findOne({ where: { id: input.hostId } }))
      newEvent.userCapacity = input.userCapacity
      newEvent.description = input.description
      newEvent.startTime = input.startTime
      newEvent.endTime = input.endTime
      newEvent.orgName = input.orgName
      newEvent.name = input.name
      newEvent.host = host

      await newEvent.save()

      const newTable = new EventTable()
      newTable.chatMessages = []
      newTable.description = `${input.name} Main Room`
      newTable.userCapacity = input.userCapacity || DEFAULT_USER_CAPACITY
      newTable.name = `${input.name} Main Room`
      newTable.head = host
      newTable.event = check(await Event.findOne({ where: { id: newEvent.id } }))
      await newTable.save()

      return newEvent
    },
    createTable: async (_, { input }, ctx) => {
      const numExistingTables = check(await EventTable.count({ where: { event: input.eventId } }))
      if (numExistingTables >= TABLE_LIMIT_PER_EVENT) {
        throw Error(`You've reached the maximum limit of ${TABLE_LIMIT_PER_EVENT} tables for your event.`)
      }
      const event = check(await Event.findOne({ where: { id: input.eventId } }))
      if (event.hostId !== input.senderId) {
        throw Error('Permission denied: Cannot create table because user is not the owner of this event.')
      }
      const newTable = new EventTable()
      newTable.chatMessages = []
      newTable.description = input.description
      newTable.userCapacity = input.userCapacity || DEFAULT_USER_CAPACITY
      newTable.name = input.name
      newTable.head = check(await User.findOne({ where: { id: input.head } }))
      newTable.event = event
      await newTable.save()
      return newTable
    },
    answerSurvey: async (_, { input }, ctx) => {
      const { answer, questionId } = input
      const question = check(await SurveyQuestion.findOne({ where: { id: questionId }, relations: ['survey'] }))

      const surveyAnswer = new SurveyAnswer()
      surveyAnswer.question = question
      surveyAnswer.answer = answer
      await surveyAnswer.save()

      question.survey.currentQuestion?.answers.push(surveyAnswer)
      ctx.pubsub.publish('SURVEY_UPDATE_' + question.survey.id, question.survey)

      return true
    },
    nextSurveyQuestion: async (_, { surveyId }, ctx) => {
      // check(ctx.user?.userType === UserType.Admin)
      const survey = check(await Survey.findOne({ where: { id: surveyId } }))
      survey.currQuestion = survey.currQuestion == null ? 0 : survey.currQuestion + 1
      await survey.save()
      ctx.pubsub.publish('SURVEY_UPDATE_' + surveyId, survey)
      return survey
    },
    sendMessage: async (root, { senderId, eventId, tableId, message }, { pubsub }) => {
      const chat = new ChatMessage()
      chat.user = check(await User.findOne({ where: { id: senderId } }))
      chat.event = check(await Event.findOne({ where: { id: eventId } }))
      chat.table = check(await EventTable.findOne({ where: { id: tableId } }))
      chat.message = message
      await chat.save()
      pubsub.publish(`CHAT_UPDATE_EVENT_${eventId}_TABLE_${tableId}`, chat)
      return chat
    },
    switchTable: async (_, { input }, ctx) => {
      const user = check(await User.findOne({ where: { id: input.participantId }, relations: ['table'] }));
      const oldTable = user.table
      if (input.eventTableId) { // join or switch to a new table
        const newTable = check(await EventTable.findOne({ where: { id : input.eventTableId }}));
        user.table = newTable;
        await user.save();
        const newTableUpdated = check(await EventTable.findOne({ where: { id : input.eventTableId }, relations: ['participants'] }));
        pubsub.publish('TABLE_UPDATE' + input.eventTableId, newTableUpdated)
      } else { // leave table
        user.table = null
        await user.save();
      }
      if (oldTable) {
        const oldTableUpdated = check(await EventTable.findOne({ where: { id: oldTable.id }, relations: ['participants'] }))
        pubsub.publish('TABLE_UPDATE' + oldTable.id, oldTableUpdated)
      }

      return user;
    }
  },
  Subscription: {
    surveyUpdates: {
      subscribe: (_, { surveyId }, context) => context.pubsub.asyncIterator('SURVEY_UPDATE_' + surveyId),
      resolve: (payload: any) => payload,
    },
    chatUpdates: {
      subscribe: (root, { eventId, tableId }, { pubsub }) => {
        return pubsub.asyncIterator(`CHAT_UPDATE_EVENT_${eventId}_TABLE_${tableId}`)
      },
      resolve: (payload: any) => payload,
    },
    tableUpdates: {
      subscribe: (_, { eventTableId }, context) => {
        return context.pubsub.asyncIterator('TABLE_UPDATE' + eventTableId)
      },
      resolve: (payload: any) => payload,
    }
  },
  EventTable: {
    participants: async (parent, args, ctx, info) => check(await User.find({ where: { table: parent } })),
    head: async (parent, args, { userLoader }, info) => check(await userLoader.load(parent.headId)),
    chatMessages: async (parent, args, ctx, info) => check(await ChatMessage.find({ where: { table: parent } }))
  },
  User: {
    table: async (parent, args, { tableLoader }, info) => parent.tableId ? check(await tableLoader.load(parent.tableId)) : null
  },
  Event: {
    eventTables: async (parent, args, ctx, info) => check(await EventTable.find({ where: { event: parent } })),
    host: async (parent, args, { userLoader }, info) => check(await userLoader.load(parent.hostId))
  },
  ChatMessage: {
    user: async (parent, args, { userLoader }, info) => check(await userLoader.load(parent.userId))
  },
  Date: new GraphQLScalarType({
    name: 'Date',
    description: 'Custom date scalar type',
    parseValue: (value) => new Date(value),
    serialize: (value) => value.getTime(),
    parseLiteral: (ast) => {
      if (ast.kind === Kind.INT) {
        return new Date(ast.value)
      }
      return null
    }
  })
}
