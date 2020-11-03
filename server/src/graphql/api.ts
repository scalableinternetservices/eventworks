import { readFileSync } from 'fs'
import { GraphQLScalarType, Kind } from 'graphql'
import { PubSub } from 'graphql-yoga'
import path from 'path'
import { check } from '../../../common/src/util'
import { Event } from '../entities/Event'
import { EventTable } from '../entities/EventTable'
import { Survey } from '../entities/Survey'
import { SurveyAnswer } from '../entities/SurveyAnswer'
import { SurveyQuestion } from '../entities/SurveyQuestion'
import { User } from '../entities/User'
import { ChatMessage, Resolvers } from './schema.types'

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

const chats: Array<ChatMessage> = []
const DEFAULT_USER_CAPACITY = 10

export const graphqlRoot: Resolvers<Context> = {
  Query: {
    self: (_, args, ctx) => ctx.user,
    survey: async (_, { surveyId }) => (await Survey.findOne({ where: { id: surveyId } })) || null,
    surveys: () => Survey.find(),
    chatMessages: (root, { eventId, tableId }, context) => chats,
    events: async (_, {}, ctx) => (await Event.find()),
    tables: async (_, { eventId }, ctx) => (await EventTable.find())
  },
  Mutation: {
    createEvent: async (_, { input }, ctx) => {
      const newEvent = new Event()
      newEvent.userCapacity = input.userCapacity
      newEvent.description = input.description
      newEvent.startTime = new Date(input.startTime)
      newEvent.endTime = new Date(input.endTime)
      newEvent.orgName = input.orgName
      newEvent.name = input.name
      await newEvent.save()
      return "success"
    },
    createTable: async (_, { tableId }, ctx) => {
      const newTable = new EventTable()
      newTable.chatMessages = []
      newTable.description = "some description"
      newTable.userCapacity = DEFAULT_USER_CAPACITY
      newTable.name = "some name"
      newTable.save()
      return true
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
      const user = check(await User.findOne({ where: { id: senderId } }))
      const event = check(await Event.findOne({ where: { id: eventId } }))
      const table = check(await EventTable.findOne({ where: { id: tableId } }))
      const chat: ChatMessage = { id: chats.length + 1, user, event, table, message }

      chats.push(chat)
      pubsub.publish(`CHAT_UPDATE_EVENT_${eventId}_TABLE_${tableId}`, chat)

      return chat
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
