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
}

const DEFAULT_USER_CAPACITY = 10

export const graphqlRoot: Resolvers<Context> = {
  Query: {
    self: (_, args, ctx) => ctx.user,
    users: async (_, args, ctx) => check(await User.find()),
    survey: async (_, { surveyId }) => (await Survey.findOne({ where: { id: surveyId } })) || null,
    surveys: () => Survey.find(),
    chatMessages: async (root, { eventId, tableId }, context) => await ChatMessage.find({
        where: {
          event: check(await Event.findOne({ where: { id: eventId } })),
          table: check(await EventTable.findOne({ where: { id: tableId } }))
        }
      }),
    events: async (_, {}, ctx) => (await Event.find()),
    tables: async(_, {}, ctx) => (await EventTable.find()),
    event: async (_, { eventId }, ctx) => check(await Event.findOne({ where: { id: eventId } })),
    table: async (_, { tableId }, ctx) => check(await EventTable.findOne({ where: { id: tableId } }))
  },
  Mutation: {
    updateUser: async (_, { input }, ctx) => {
      const newUser = new User()
      newUser.title = input.title || ''
      newUser.name = input.name
      newUser.email = input.email
      newUser.linkedinLink = input.linkedinLink || ''
      await newUser.save()
      return newUser
    },
    createEvent: async (_, { input }, ctx) => {
      const newEvent = new Event()
      newEvent.userCapacity = input.userCapacity
      newEvent.description = input.description
      newEvent.startTime = input.startTime
      newEvent.endTime = input.endTime
      newEvent.orgName = input.orgName
      newEvent.name = input.name

      await newEvent.save()

      const newTable = new EventTable()
      newTable.chatMessages = []
      newTable.description = `${input.name} Main Room`
      newTable.userCapacity = input.userCapacity || DEFAULT_USER_CAPACITY
      newTable.name = `${input.name} Main Room`
      newTable.head = check(await User.findOne({ where: { id: input.hostId } }))
      newTable.event = check(await Event.findOne({ where: { id: newEvent.id } }))
      await newTable.save()

      return newEvent
    },
    createTable: async (_, { input }, ctx) => {
      const newTable = new EventTable()
      newTable.chatMessages = []
      newTable.description = input.description
      newTable.userCapacity = input.userCapacity || DEFAULT_USER_CAPACITY
      newTable.name = input.name
      newTable.head = check(await User.findOne({ where: { id: input.head } }))
      newTable.event = check(await Event.findOne({ where: { id: input.eventId } }))
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
    joinTable: async (_, { input }, ctx) => {
      const table = check(await EventTable.findOne({ where: { id : input.eventTableId }}));
      const user = check(await User.findOne({ where: { id: input.participantId }}));
      user.table = table;
      await user.save();
      const table2 = check(await EventTable.findOne({ where: { id : input.eventTableId }}));

      pubsub.publish('TABLE_UPDATE' + input.eventTableId, table2)
      return user;
    },
    leaveTable: async (_, { input }, ctx) => {
      const user = check(await User.findOne({ where: { id: input.participantId }}));
      user.table = null;
      await user.save()
      const table = check(await EventTable.findOne({ where: { id : input.eventTableId }}));

      pubsub.publish('TABLE_UPDATE' + input.eventTableId, table)
      return user
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
