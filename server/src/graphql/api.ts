import { readFileSync } from 'fs'
import { PubSub } from 'graphql-yoga'
import path from 'path'
import { check } from '../../../common/src/util'
import { Event } from '../entities/Event'
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

export const graphqlRoot: Resolvers<Context> = {
  Query: {
    self: (_, args, ctx) => ctx.user,
    survey: async (_, { surveyId }) => (await Survey.findOne({ where: { id: surveyId } })) || null,
    surveys: () => Survey.find(),
    chatMessages: (root, args, context) => chats
  },
  Mutation: {
    createEvent: async (_, { input }, ctx) => {
      const newEvent = new Event()
      newEvent.userCapacity = input.userCapacity
      newEvent.description = input.description
      newEvent.startTime = new Date(input.startTime)
      newEvent.endTime = new Date(input.endTime)
      newEvent.orgName = input.orgName
      newEvent.name = input.eventName
      await newEvent.save()
      return "success"
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
    sendMessage: (root, { from, message }, { pubsub }) => {
      const chat: ChatMessage = { id: chats.length + 1, message }

      chats.push(chat)
      pubsub.publish('CHAT_CHANNEL', chat)

      return chat
    }
  },
  Subscription: {
    surveyUpdates: {
      subscribe: (_, { surveyId }, context) => context.pubsub.asyncIterator('SURVEY_UPDATE_' + surveyId),
      resolve: (payload: any) => payload,
    },
    chatUpdates: {
      subscribe: (root, args, { pubsub }) => {
        return pubsub.asyncIterator('CHAT_CHANNEL')
      },
      resolve: (payload: any) => payload,
    }
  },
}
