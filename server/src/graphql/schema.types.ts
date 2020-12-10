import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql'
export type Maybe<T> = T | null
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } &
  { [P in K]-?: NonNullable<T[P]> }
/** All built-in and custom scalars, mapped to their actual values */
export interface Scalars {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  Date: any
}

export interface Query {
  __typename?: 'Query'
  self?: Maybe<User>
  usersAtTable: Array<User>
  user: User
  users: Array<User>
  surveys: Array<Survey>
  survey?: Maybe<Survey>
  chatMessages: Array<ChatMessage>
  events: Array<Event>
  event: Event
  table?: Maybe<Array<User>>
  tableInfo: EventTable
}

export interface QueryUsersAtTableArgs {
  tableId: Scalars['Int']
}

export interface QueryUserArgs {
  userId: Scalars['Int']
}

export interface QuerySurveyArgs {
  surveyId: Scalars['Int']
}

export interface QueryChatMessagesArgs {
  eventId: Scalars['Int']
  tableId: Scalars['Int']
  offset?: Scalars['Int']
}

export interface QueryEventArgs {
  eventId: Scalars['Int']
  userId: Scalars['Int']
}

export interface QueryTableArgs {
  tableId: Scalars['Int']
}

export interface QueryTableInfoArgs {
  tableId: Scalars['Int']
}

export interface Mutation {
  __typename?: 'Mutation'
  ping?: Maybe<Scalars['String']>
  answerSurvey: Scalars['Boolean']
  nextSurveyQuestion?: Maybe<Survey>
  createEvent: Event
  createTable?: Maybe<EventTable>
  updateUser: User
  sendMessage: ChatMessage
  switchTable: User
}

export interface MutationPingArgs {
  userId: Scalars['Int']
}

export interface MutationAnswerSurveyArgs {
  input: SurveyInput
}

export interface MutationNextSurveyQuestionArgs {
  surveyId: Scalars['Int']
}

export interface MutationCreateEventArgs {
  input: EventInput
}

export interface MutationCreateTableArgs {
  input: EventTableInput
}

export interface MutationUpdateUserArgs {
  input: UserInput
}

export interface MutationSendMessageArgs {
  senderId: Scalars['Int']
  eventId: Scalars['Int']
  tableId: Scalars['Int']
  message: Scalars['String']
}

export interface MutationSwitchTableArgs {
  input: SwitchTableInput
}

export interface Subscription {
  __typename?: 'Subscription'
  surveyUpdates?: Maybe<Survey>
  chatUpdates?: Maybe<ChatMessage>
  tableUpdates: Array<User>
}

export interface SubscriptionSurveyUpdatesArgs {
  surveyId: Scalars['Int']
}

export interface SubscriptionChatUpdatesArgs {
  eventId: Scalars['Int']
  tableId: Scalars['Int']
}

export interface SubscriptionTableUpdatesArgs {
  eventTableId: Scalars['Int']
}

export interface SwitchTableInput {
  eventId: Scalars['Int']
  eventTableId?: Maybe<Scalars['Int']>
  participantId: Scalars['Int']
}

export interface EventInput {
  startTime: Scalars['Date']
  endTime: Scalars['Date']
  userCapacity: Scalars['Int']
  name: Scalars['String']
  orgName: Scalars['String']
  description: Scalars['String']
  hostId: Scalars['Int']
}

export interface Event {
  __typename?: 'Event'
  id: Scalars['Int']
  startTime: Scalars['Date']
  endTime: Scalars['Date']
  userCapacity: Scalars['Int']
  name: Scalars['String']
  orgName: Scalars['String']
  description: Scalars['String']
  eventTables?: Maybe<Array<EventTable>>
  host?: Maybe<User>
  hostId: Scalars['Int']
}

export interface UserInput {
  id: Scalars['Int']
  email: Scalars['String']
  name: Scalars['String']
  title?: Maybe<Scalars['String']>
  linkedinLink?: Maybe<Scalars['String']>
}

export interface User {
  __typename?: 'User'
  id: Scalars['Int']
  userType: UserType
  email: Scalars['String']
  name: Scalars['String']
  title?: Maybe<Scalars['String']>
  linkedinLink?: Maybe<Scalars['String']>
  table?: Maybe<EventTable>
  tableId?: Maybe<Scalars['Int']>
  hostedEvents?: Maybe<Array<Event>>
}

export enum UserType {
  Admin = 'ADMIN',
  User = 'USER',
}

export enum EventUserPerm {
  Attendee = 'ATTENDEE',
  Tablelead = 'TABLELEAD',
  Cohost = 'COHOST',
  Eventhost = 'EVENTHOST',
}

export interface Survey {
  __typename?: 'Survey'
  id: Scalars['Int']
  name: Scalars['String']
  isStarted: Scalars['Boolean']
  isCompleted: Scalars['Boolean']
  currentQuestion?: Maybe<SurveyQuestion>
  questions: Array<Maybe<SurveyQuestion>>
}

export interface SurveyQuestion {
  __typename?: 'SurveyQuestion'
  id: Scalars['Int']
  prompt: Scalars['String']
  choices?: Maybe<Array<Scalars['String']>>
  answers: Array<SurveyAnswer>
  survey: Survey
}

export interface SurveyAnswer {
  __typename?: 'SurveyAnswer'
  id: Scalars['Int']
  answer: Scalars['String']
  question: SurveyQuestion
}

export interface SurveyInput {
  questionId: Scalars['Int']
  answer: Scalars['String']
}

export interface ChatMessage {
  __typename?: 'ChatMessage'
  id: Scalars['Int']
  user: User
  userId: Scalars['Int']
  message: Scalars['String']
  event: Event
  table: EventTable
  tableId: Scalars['Int']
}

export interface EventTable {
  __typename?: 'EventTable'
  id: Scalars['Int']
  headId: Scalars['Int']
  head: User
  name: Scalars['String']
  description: Scalars['String']
  userCapacity: Scalars['Int']
  chatMessages: Array<ChatMessage>
  participants?: Maybe<Array<User>>
}

export interface EventTableInput {
  eventId: Scalars['Int']
  head: Scalars['Int']
  name: Scalars['String']
  description: Scalars['String']
  userCapacity?: Maybe<Scalars['Int']>
  senderId: Scalars['Int']
}

export type ResolverTypeWrapper<T> = Promise<T> | T

export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>
}

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>
}
export type StitchingResolver<TResult, TParent, TContext, TArgs> =
  | LegacyStitchingResolver<TResult, TParent, TContext, TArgs>
  | NewStitchingResolver<TResult, TParent, TContext, TArgs>
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>

export type IsTypeOfResolverFn<T = {}> = (obj: T, info: GraphQLResolveInfo) => boolean | Promise<boolean>

export type NextResolverFn<T> = () => Promise<T>

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Query: ResolverTypeWrapper<{}>
  Int: ResolverTypeWrapper<Scalars['Int']>
  Mutation: ResolverTypeWrapper<{}>
  String: ResolverTypeWrapper<Scalars['String']>
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>
  Subscription: ResolverTypeWrapper<{}>
  Date: ResolverTypeWrapper<Scalars['Date']>
  SwitchTableInput: SwitchTableInput
  EventInput: EventInput
  Event: ResolverTypeWrapper<Event>
  UserInput: UserInput
  User: ResolverTypeWrapper<User>
  UserType: UserType
  EventUserPerm: EventUserPerm
  Survey: ResolverTypeWrapper<Survey>
  SurveyQuestion: ResolverTypeWrapper<SurveyQuestion>
  SurveyAnswer: ResolverTypeWrapper<SurveyAnswer>
  SurveyInput: SurveyInput
  ChatMessage: ResolverTypeWrapper<ChatMessage>
  EventTable: ResolverTypeWrapper<EventTable>
  EventTableInput: EventTableInput
}

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Query: {}
  Int: Scalars['Int']
  Mutation: {}
  String: Scalars['String']
  Boolean: Scalars['Boolean']
  Subscription: {}
  Date: Scalars['Date']
  SwitchTableInput: SwitchTableInput
  EventInput: EventInput
  Event: Event
  UserInput: UserInput
  User: User
  Survey: Survey
  SurveyQuestion: SurveyQuestion
  SurveyAnswer: SurveyAnswer
  SurveyInput: SurveyInput
  ChatMessage: ChatMessage
  EventTable: EventTable
  EventTableInput: EventTableInput
}

export type QueryResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']
> = {
  self?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>
  usersAtTable?: Resolver<
    Array<ResolversTypes['User']>,
    ParentType,
    ContextType,
    RequireFields<QueryUsersAtTableArgs, 'tableId'>
  >
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<QueryUserArgs, 'userId'>>
  users?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>
  surveys?: Resolver<Array<ResolversTypes['Survey']>, ParentType, ContextType>
  survey?: Resolver<
    Maybe<ResolversTypes['Survey']>,
    ParentType,
    ContextType,
    RequireFields<QuerySurveyArgs, 'surveyId'>
  >
  chatMessages?: Resolver<
    Array<ResolversTypes['ChatMessage']>,
    ParentType,
    ContextType,
    RequireFields<QueryChatMessagesArgs, 'eventId' | 'tableId' | 'offset'>
  >
  events?: Resolver<Array<ResolversTypes['Event']>, ParentType, ContextType>
  event?: Resolver<
    ResolversTypes['Event'],
    ParentType,
    ContextType,
    RequireFields<QueryEventArgs, 'eventId' | 'userId'>
  >
  table?: Resolver<
    Maybe<Array<ResolversTypes['User']>>,
    ParentType,
    ContextType,
    RequireFields<QueryTableArgs, 'tableId'>
  >
  tableInfo?: Resolver<
    ResolversTypes['EventTable'],
    ParentType,
    ContextType,
    RequireFields<QueryTableInfoArgs, 'tableId'>
  >
}

export type MutationResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']
> = {
  ping?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, RequireFields<MutationPingArgs, 'userId'>>
  answerSurvey?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType,
    RequireFields<MutationAnswerSurveyArgs, 'input'>
  >
  nextSurveyQuestion?: Resolver<
    Maybe<ResolversTypes['Survey']>,
    ParentType,
    ContextType,
    RequireFields<MutationNextSurveyQuestionArgs, 'surveyId'>
  >
  createEvent?: Resolver<
    ResolversTypes['Event'],
    ParentType,
    ContextType,
    RequireFields<MutationCreateEventArgs, 'input'>
  >
  createTable?: Resolver<
    Maybe<ResolversTypes['EventTable']>,
    ParentType,
    ContextType,
    RequireFields<MutationCreateTableArgs, 'input'>
  >
  updateUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationUpdateUserArgs, 'input'>>
  sendMessage?: Resolver<
    ResolversTypes['ChatMessage'],
    ParentType,
    ContextType,
    RequireFields<MutationSendMessageArgs, 'senderId' | 'eventId' | 'tableId' | 'message'>
  >
  switchTable?: Resolver<
    ResolversTypes['User'],
    ParentType,
    ContextType,
    RequireFields<MutationSwitchTableArgs, 'input'>
  >
}

export type SubscriptionResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']
> = {
  surveyUpdates?: SubscriptionResolver<
    Maybe<ResolversTypes['Survey']>,
    'surveyUpdates',
    ParentType,
    ContextType,
    RequireFields<SubscriptionSurveyUpdatesArgs, 'surveyId'>
  >
  chatUpdates?: SubscriptionResolver<
    Maybe<ResolversTypes['ChatMessage']>,
    'chatUpdates',
    ParentType,
    ContextType,
    RequireFields<SubscriptionChatUpdatesArgs, 'eventId' | 'tableId'>
  >
  tableUpdates?: SubscriptionResolver<
    Array<ResolversTypes['User']>,
    'tableUpdates',
    ParentType,
    ContextType,
    RequireFields<SubscriptionTableUpdatesArgs, 'eventTableId'>
  >
}

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date'
}

export type EventResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Event'] = ResolversParentTypes['Event']
> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  startTime?: Resolver<ResolversTypes['Date'], ParentType, ContextType>
  endTime?: Resolver<ResolversTypes['Date'], ParentType, ContextType>
  userCapacity?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  orgName?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  eventTables?: Resolver<Maybe<Array<ResolversTypes['EventTable']>>, ParentType, ContextType>
  host?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>
  hostId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType>
}

export type UserResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']
> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  userType?: Resolver<ResolversTypes['UserType'], ParentType, ContextType>
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  linkedinLink?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  table?: Resolver<Maybe<ResolversTypes['EventTable']>, ParentType, ContextType>
  tableId?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>
  hostedEvents?: Resolver<Maybe<Array<ResolversTypes['Event']>>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType>
}

export type SurveyResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Survey'] = ResolversParentTypes['Survey']
> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  isStarted?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>
  isCompleted?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>
  currentQuestion?: Resolver<Maybe<ResolversTypes['SurveyQuestion']>, ParentType, ContextType>
  questions?: Resolver<Array<Maybe<ResolversTypes['SurveyQuestion']>>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType>
}

export type SurveyQuestionResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['SurveyQuestion'] = ResolversParentTypes['SurveyQuestion']
> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  prompt?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  choices?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>
  answers?: Resolver<Array<ResolversTypes['SurveyAnswer']>, ParentType, ContextType>
  survey?: Resolver<ResolversTypes['Survey'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType>
}

export type SurveyAnswerResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['SurveyAnswer'] = ResolversParentTypes['SurveyAnswer']
> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  answer?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  question?: Resolver<ResolversTypes['SurveyQuestion'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType>
}

export type ChatMessageResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['ChatMessage'] = ResolversParentTypes['ChatMessage']
> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>
  userId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  event?: Resolver<ResolversTypes['Event'], ParentType, ContextType>
  table?: Resolver<ResolversTypes['EventTable'], ParentType, ContextType>
  tableId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType>
}

export type EventTableResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['EventTable'] = ResolversParentTypes['EventTable']
> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  headId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  head?: Resolver<ResolversTypes['User'], ParentType, ContextType>
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  userCapacity?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  chatMessages?: Resolver<Array<ResolversTypes['ChatMessage']>, ParentType, ContextType>
  participants?: Resolver<Maybe<Array<ResolversTypes['User']>>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType>
}

export type Resolvers<ContextType = any> = {
  Query?: QueryResolvers<ContextType>
  Mutation?: MutationResolvers<ContextType>
  Subscription?: SubscriptionResolvers<ContextType>
  Date?: GraphQLScalarType
  Event?: EventResolvers<ContextType>
  User?: UserResolvers<ContextType>
  Survey?: SurveyResolvers<ContextType>
  SurveyQuestion?: SurveyQuestionResolvers<ContextType>
  SurveyAnswer?: SurveyAnswerResolvers<ContextType>
  ChatMessage?: ChatMessageResolvers<ContextType>
  EventTable?: EventTableResolvers<ContextType>
}

/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>
