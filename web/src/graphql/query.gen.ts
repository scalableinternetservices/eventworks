/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: FetchAllEvent
// ====================================================

export interface FetchAllEvent_events_eventTables_head {
  __typename: "User";
  id: number;
  name: string;
}

export interface FetchAllEvent_events_eventTables_participants {
  __typename: "User";
  id: number;
  name: string;
}

export interface FetchAllEvent_events_eventTables {
  __typename: "EventTable";
  id: number;
  name: string;
  description: string;
  userCapacity: number;
  head: FetchAllEvent_events_eventTables_head;
  participants: FetchAllEvent_events_eventTables_participants[] | null;
}

export interface FetchAllEvent_events {
  __typename: "Event";
  id: number;
  endTime: any;
  startTime: any;
  description: string;
  name: string;
  orgName: string;
  eventTables: FetchAllEvent_events_eventTables[] | null;
}

export interface FetchAllEvent {
  events: FetchAllEvent_events[];
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: FetchEvent
// ====================================================

export interface FetchEvent_event_host {
  __typename: "User";
  id: number;
}

export interface FetchEvent_event_eventTables_head {
  __typename: "User";
  id: number;
  name: string;
}

export interface FetchEvent_event_eventTables_participants {
  __typename: "User";
  id: number;
  name: string;
}

export interface FetchEvent_event_eventTables {
  __typename: "EventTable";
  id: number;
  name: string;
  description: string;
  userCapacity: number;
  head: FetchEvent_event_eventTables_head;
  participants: FetchEvent_event_eventTables_participants[] | null;
}

export interface FetchEvent_event {
  __typename: "Event";
  id: number;
  endTime: any;
  startTime: any;
  description: string;
  name: string;
  orgName: string;
  host: FetchEvent_event_host | null;
  eventTables: FetchEvent_event_eventTables[] | null;
}

export interface FetchEvent {
  event: FetchEvent_event;
}

export interface FetchEventVariables {
  eventId: number;
  userId: number;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: FetchTable
// ====================================================

export interface FetchTable_table {
  __typename: "User";
  id: number;
  name: string;
}

export interface FetchTable {
  table: FetchTable_table[] | null;
}

export interface FetchTableVariables {
  tableId: number;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: FetchTableInfo
// ====================================================

export interface FetchTableInfo_tableInfo_head {
  __typename: "User";
  id: number;
  name: string;
}

export interface FetchTableInfo_tableInfo_participants {
  __typename: "User";
  id: number;
  name: string;
}

export interface FetchTableInfo_tableInfo {
  __typename: "EventTable";
  id: number;
  name: string;
  description: string;
  userCapacity: number;
  head: FetchTableInfo_tableInfo_head;
  participants: FetchTableInfo_tableInfo_participants[] | null;
}

export interface FetchTableInfo {
  tableInfo: FetchTableInfo_tableInfo;
}

export interface FetchTableInfoVariables {
  tableId: number;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: Ping
// ====================================================

export interface Ping {
  ping: string | null;
}

export interface PingVariables {
  userId: number;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateEvent
// ====================================================

export interface CreateEvent_createEvent_eventTables_head {
  __typename: "User";
  id: number;
  name: string;
}

export interface CreateEvent_createEvent_eventTables {
  __typename: "EventTable";
  id: number;
  name: string;
  description: string;
  userCapacity: number;
  head: CreateEvent_createEvent_eventTables_head;
}

export interface CreateEvent_createEvent {
  __typename: "Event";
  id: number;
  startTime: any;
  endTime: any;
  userCapacity: number;
  name: string;
  orgName: string;
  description: string;
  eventTables: CreateEvent_createEvent_eventTables[] | null;
}

export interface CreateEvent {
  createEvent: CreateEvent_createEvent;
}

export interface CreateEventVariables {
  input: EventInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: FetchUserContext
// ====================================================

export interface FetchUserContext_self_hostedEvents {
  __typename: "Event";
  id: number;
  name: string;
  orgName: string;
  userCapacity: number;
  startTime: any;
  endTime: any;
}

export interface FetchUserContext_self {
  __typename: "User";
  id: number;
  name: string;
  userType: UserType;
  email: string;
  title: string | null;
  linkedinLink: string | null;
  hostedEvents: FetchUserContext_self_hostedEvents[] | null;
}

export interface FetchUserContext {
  self: FetchUserContext_self | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: FetchUsersAtTable
// ====================================================

export interface FetchUsersAtTable_usersAtTable {
  __typename: "User";
  id: number;
  name: string;
}

export interface FetchUsersAtTable {
  usersAtTable: FetchUsersAtTable_usersAtTable[];
}

export interface FetchUsersAtTableVariables {
  tableId: number;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: FetchOneUser
// ====================================================

export interface FetchOneUser_user_table {
  __typename: "EventTable";
  id: number;
  name: string;
}

export interface FetchOneUser_user {
  __typename: "User";
  id: number;
  name: string;
  userType: UserType;
  email: string;
  title: string | null;
  linkedinLink: string | null;
  table: FetchOneUser_user_table | null;
}

export interface FetchOneUser {
  user: FetchOneUser_user;
}

export interface FetchOneUserVariables {
  userId: number;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdateUser
// ====================================================

export interface UpdateUser_updateUser_table {
  __typename: "EventTable";
  id: number;
  name: string;
}

export interface UpdateUser_updateUser {
  __typename: "User";
  name: string;
  title: string | null;
  email: string;
  linkedinLink: string | null;
  id: number;
  userType: UserType;
  table: UpdateUser_updateUser_table | null;
}

export interface UpdateUser {
  updateUser: UpdateUser_updateUser;
}

export interface UpdateUserVariables {
  input: UserInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: FetchChatMessage
// ====================================================

export interface FetchChatMessage_chatMessages_user_table {
  __typename: "EventTable";
  id: number;
  name: string;
}

export interface FetchChatMessage_chatMessages_user {
  __typename: "User";
  id: number;
  userType: UserType;
  email: string;
  name: string;
  title: string | null;
  linkedinLink: string | null;
  table: FetchChatMessage_chatMessages_user_table | null;
}

export interface FetchChatMessage_chatMessages {
  __typename: "ChatMessage";
  id: number;
  user: FetchChatMessage_chatMessages_user;
  message: string;
}

export interface FetchChatMessage {
  chatMessages: FetchChatMessage_chatMessages[];
}

export interface FetchChatMessageVariables {
  eventId: number;
  tableId: number;
  offset: number;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL subscription operation: ChatSubscription
// ====================================================

export interface ChatSubscription_chatUpdates_user_table {
  __typename: "EventTable";
  id: number;
  name: string;
}

export interface ChatSubscription_chatUpdates_user {
  __typename: "User";
  id: number;
  userType: UserType;
  email: string;
  name: string;
  title: string | null;
  linkedinLink: string | null;
  table: ChatSubscription_chatUpdates_user_table | null;
}

export interface ChatSubscription_chatUpdates {
  __typename: "ChatMessage";
  id: number;
  user: ChatSubscription_chatUpdates_user;
  message: string;
}

export interface ChatSubscription {
  chatUpdates: ChatSubscription_chatUpdates | null;
}

export interface ChatSubscriptionVariables {
  eventId: number;
  tableId: number;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: SendChatMessage
// ====================================================

export interface SendChatMessage_sendMessage_user_table {
  __typename: "EventTable";
  id: number;
  name: string;
}

export interface SendChatMessage_sendMessage_user {
  __typename: "User";
  id: number;
  userType: UserType;
  email: string;
  name: string;
  title: string | null;
  linkedinLink: string | null;
  table: SendChatMessage_sendMessage_user_table | null;
}

export interface SendChatMessage_sendMessage {
  __typename: "ChatMessage";
  id: number;
  user: SendChatMessage_sendMessage_user;
  message: string;
}

export interface SendChatMessage {
  sendMessage: SendChatMessage_sendMessage;
}

export interface SendChatMessageVariables {
  senderId: number;
  eventId: number;
  tableId: number;
  message: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL subscription operation: EventTableSubscription
// ====================================================

export interface EventTableSubscription_tableUpdates {
  __typename: "User";
  id: number;
  name: string;
}

export interface EventTableSubscription {
  tableUpdates: EventTableSubscription_tableUpdates[];
}

export interface EventTableSubscriptionVariables {
  eventTableId: number;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateTable
// ====================================================

export interface CreateTable_createTable_head {
  __typename: "User";
  id: number;
  name: string;
}

export interface CreateTable_createTable_participants {
  __typename: "User";
  id: number;
  name: string;
}

export interface CreateTable_createTable {
  __typename: "EventTable";
  id: number;
  name: string;
  description: string;
  userCapacity: number;
  head: CreateTable_createTable_head;
  participants: CreateTable_createTable_participants[] | null;
}

export interface CreateTable {
  createTable: CreateTable_createTable | null;
}

export interface CreateTableVariables {
  input: EventTableInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: SwitchTable
// ====================================================

export interface SwitchTable_switchTable_table {
  __typename: "EventTable";
  id: number;
  name: string;
}

export interface SwitchTable_switchTable {
  __typename: "User";
  id: number;
  userType: UserType;
  email: string;
  name: string;
  title: string | null;
  linkedinLink: string | null;
  table: SwitchTable_switchTable_table | null;
}

export interface SwitchTable {
  switchTable: SwitchTable_switchTable;
}

export interface SwitchTableVariables {
  input: SwitchTableInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: FetchSurveys
// ====================================================

export interface FetchSurveys_surveys_currentQuestion_answers {
  __typename: "SurveyAnswer";
  answer: string;
}

export interface FetchSurveys_surveys_currentQuestion {
  __typename: "SurveyQuestion";
  id: number;
  prompt: string;
  choices: string[] | null;
  answers: FetchSurveys_surveys_currentQuestion_answers[];
}

export interface FetchSurveys_surveys {
  __typename: "Survey";
  id: number;
  name: string;
  isStarted: boolean;
  isCompleted: boolean;
  currentQuestion: FetchSurveys_surveys_currentQuestion | null;
}

export interface FetchSurveys {
  surveys: FetchSurveys_surveys[];
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL subscription operation: SurveySubscription
// ====================================================

export interface SurveySubscription_surveyUpdates_currentQuestion_answers {
  __typename: "SurveyAnswer";
  answer: string;
}

export interface SurveySubscription_surveyUpdates_currentQuestion {
  __typename: "SurveyQuestion";
  id: number;
  prompt: string;
  choices: string[] | null;
  answers: SurveySubscription_surveyUpdates_currentQuestion_answers[];
}

export interface SurveySubscription_surveyUpdates {
  __typename: "Survey";
  id: number;
  name: string;
  isStarted: boolean;
  isCompleted: boolean;
  currentQuestion: SurveySubscription_surveyUpdates_currentQuestion | null;
}

export interface SurveySubscription {
  surveyUpdates: SurveySubscription_surveyUpdates | null;
}

export interface SurveySubscriptionVariables {
  surveyId: number;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: FetchSurvey
// ====================================================

export interface FetchSurvey_survey_currentQuestion_answers {
  __typename: "SurveyAnswer";
  answer: string;
}

export interface FetchSurvey_survey_currentQuestion {
  __typename: "SurveyQuestion";
  id: number;
  prompt: string;
  choices: string[] | null;
  answers: FetchSurvey_survey_currentQuestion_answers[];
}

export interface FetchSurvey_survey {
  __typename: "Survey";
  id: number;
  name: string;
  isStarted: boolean;
  isCompleted: boolean;
  currentQuestion: FetchSurvey_survey_currentQuestion | null;
}

export interface FetchSurvey {
  survey: FetchSurvey_survey | null;
}

export interface FetchSurveyVariables {
  surveyId: number;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: AnswerSurveyQuestion
// ====================================================

export interface AnswerSurveyQuestion {
  answerSurvey: boolean;
}

export interface AnswerSurveyQuestionVariables {
  input: SurveyInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: NextSurveyQuestion
// ====================================================

export interface NextSurveyQuestion_nextSurveyQuestion_currentQuestion_answers {
  __typename: "SurveyAnswer";
  answer: string;
}

export interface NextSurveyQuestion_nextSurveyQuestion_currentQuestion {
  __typename: "SurveyQuestion";
  id: number;
  prompt: string;
  choices: string[] | null;
  answers: NextSurveyQuestion_nextSurveyQuestion_currentQuestion_answers[];
}

export interface NextSurveyQuestion_nextSurveyQuestion {
  __typename: "Survey";
  id: number;
  name: string;
  isStarted: boolean;
  isCompleted: boolean;
  currentQuestion: NextSurveyQuestion_nextSurveyQuestion_currentQuestion | null;
}

export interface NextSurveyQuestion {
  nextSurveyQuestion: NextSurveyQuestion_nextSurveyQuestion | null;
}

export interface NextSurveyQuestionVariables {
  surveyId: number;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: Event
// ====================================================

export interface Event_eventTables_head {
  __typename: "User";
  id: number;
  name: string;
}

export interface Event_eventTables {
  __typename: "EventTable";
  id: number;
  name: string;
  description: string;
  userCapacity: number;
  head: Event_eventTables_head;
}

export interface Event {
  __typename: "Event";
  id: number;
  startTime: any;
  endTime: any;
  userCapacity: number;
  name: string;
  orgName: string;
  description: string;
  eventTables: Event_eventTables[] | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: EventTable
// ====================================================

export interface EventTable_head {
  __typename: "User";
  id: number;
  name: string;
}

export interface EventTable_participants {
  __typename: "User";
  id: number;
  name: string;
}

export interface EventTable {
  __typename: "EventTable";
  id: number;
  name: string;
  description: string;
  userCapacity: number;
  head: EventTable_head;
  participants: EventTable_participants[] | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: User
// ====================================================

export interface User_table {
  __typename: "EventTable";
  id: number;
  name: string;
}

export interface User {
  __typename: "User";
  id: number;
  userType: UserType;
  email: string;
  name: string;
  title: string | null;
  linkedinLink: string | null;
  table: User_table | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ChatMessage
// ====================================================

export interface ChatMessage_user_table {
  __typename: "EventTable";
  id: number;
  name: string;
}

export interface ChatMessage_user {
  __typename: "User";
  id: number;
  userType: UserType;
  email: string;
  name: string;
  title: string | null;
  linkedinLink: string | null;
  table: ChatMessage_user_table | null;
}

export interface ChatMessage {
  __typename: "ChatMessage";
  id: number;
  user: ChatMessage_user;
  message: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: Survey
// ====================================================

export interface Survey_currentQuestion_answers {
  __typename: "SurveyAnswer";
  answer: string;
}

export interface Survey_currentQuestion {
  __typename: "SurveyQuestion";
  id: number;
  prompt: string;
  choices: string[] | null;
  answers: Survey_currentQuestion_answers[];
}

export interface Survey {
  __typename: "Survey";
  id: number;
  name: string;
  isStarted: boolean;
  isCompleted: boolean;
  currentQuestion: Survey_currentQuestion | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: SurveyQuestion
// ====================================================

export interface SurveyQuestion_answers {
  __typename: "SurveyAnswer";
  answer: string;
}

export interface SurveyQuestion {
  __typename: "SurveyQuestion";
  id: number;
  prompt: string;
  choices: string[] | null;
  answers: SurveyQuestion_answers[];
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum UserType {
  ADMIN = "ADMIN",
  USER = "USER",
}

export interface EventInput {
  startTime: any;
  endTime: any;
  userCapacity: number;
  name: string;
  orgName: string;
  description: string;
  hostId: number;
}

export interface EventTableInput {
  eventId: number;
  head: number;
  name: string;
  description: string;
  userCapacity?: number | null;
  senderId: number;
}

export interface SurveyInput {
  questionId: number;
  answer: string;
}

export interface SwitchTableInput {
  eventId: number;
  eventTableId?: number | null;
  participantId: number;
}

export interface UserInput {
  id: number;
  email: string;
  name: string;
  title?: string | null;
  linkedinLink?: string | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
