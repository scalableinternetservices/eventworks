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
  participants: FetchAllEvent_events_eventTables_participants[];
}

export interface FetchAllEvent_events {
  __typename: "Event";
  id: number;
  endTime: string;
  startTime: string;
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
  participants: FetchEvent_event_eventTables_participants[];
}

export interface FetchEvent_event {
  __typename: "Event";
  id: number;
  endTime: string;
  startTime: string;
  description: string;
  name: string;
  orgName: string;
  eventTables: FetchEvent_event_eventTables[] | null;
}

export interface FetchEvent {
  event: FetchEvent_event;
}

export interface FetchEventVariables {
  eventId: number;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: FetchTable
// ====================================================

export interface FetchTable_table_head {
  __typename: "User";
  id: number;
  name: string;
}

export interface FetchTable_table_participants {
  __typename: "User";
  id: number;
  name: string;
}

export interface FetchTable_table {
  __typename: "EventTable";
  id: number;
  name: string;
  description: string;
  userCapacity: number;
  head: FetchTable_table_head;
  participants: FetchTable_table_participants[];
}

export interface FetchTable {
  table: FetchTable_table;
}

export interface FetchTableVariables {
  tableId: number;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL subscription operation: EventTableSubscription
// ====================================================

export interface EventTableSubscription_tableUpdates_head {
  __typename: "User";
  id: number;
  name: string;
}

export interface EventTableSubscription_tableUpdates_participants {
  __typename: "User";
  id: number;
  name: string;
}

export interface EventTableSubscription_tableUpdates {
  __typename: "EventTable";
  id: number;
  name: string;
  description: string;
  userCapacity: number;
  head: EventTableSubscription_tableUpdates_head;
  participants: EventTableSubscription_tableUpdates_participants[];
}

export interface EventTableSubscription {
  tableUpdates: EventTableSubscription_tableUpdates | null;
}

export interface EventTableSubscriptionVariables {
  eventTableId: number;
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

export interface CreateEvent_createEvent_eventTables_participants {
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
  participants: CreateEvent_createEvent_eventTables_participants[];
}

export interface CreateEvent_createEvent {
  __typename: "Event";
  id: number;
  startTime: string;
  endTime: string;
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

export interface FetchUserContext_self {
  __typename: "User";
  id: number;
  name: string;
  userType: UserType;
  email: string;
  title: string;
  linkedinLink: string;
  seated: boolean;
}

export interface FetchUserContext {
  self: FetchUserContext_self | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdateUser
// ====================================================

export interface UpdateUser_updateUser {
  __typename: "User";
  name: string;
  title: string;
  email: string;
  linkedinLink: string;
  id: number;
  userType: UserType;
  seated: boolean;
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

export interface FetchChatMessage_chatMessages_user {
  __typename: "User";
  id: number;
  userType: UserType;
  email: string;
  name: string;
  title: string;
  linkedinLink: string;
  seated: boolean;
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
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL subscription operation: ChatSubscription
// ====================================================

export interface ChatSubscription_chatUpdates_user {
  __typename: "User";
  id: number;
  userType: UserType;
  email: string;
  name: string;
  title: string;
  linkedinLink: string;
  seated: boolean;
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

export interface SendChatMessage_sendMessage_user {
  __typename: "User";
  id: number;
  userType: UserType;
  email: string;
  name: string;
  title: string;
  linkedinLink: string;
  seated: boolean;
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
  participants: CreateTable_createTable_participants[];
}

export interface CreateTable {
  createTable: CreateTable_createTable;
}

export interface CreateTableVariables {
  input: EventTableInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: JoinTable
// ====================================================

export interface JoinTable_joinTable {
  __typename: "User";
  id: number;
  userType: UserType;
  email: string;
  name: string;
  title: string;
  linkedinLink: string;
  seated: boolean;
}

export interface JoinTable {
  joinTable: JoinTable_joinTable;
}

export interface JoinTableVariables {
  input: JoinTableInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: LeaveTable
// ====================================================

export interface LeaveTable_leaveTable {
  __typename: "User";
  id: number;
  userType: UserType;
  email: string;
  name: string;
  title: string;
  linkedinLink: string;
  seated: boolean;
}

export interface LeaveTable {
  leaveTable: LeaveTable_leaveTable;
}

export interface LeaveTableVariables {
  input: JoinTableInput;
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

export interface Event_eventTables_participants {
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
  participants: Event_eventTables_participants[];
}

export interface Event {
  __typename: "Event";
  id: number;
  startTime: string;
  endTime: string;
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
  participants: EventTable_participants[];
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: User
// ====================================================

export interface User {
  __typename: "User";
  id: number;
  userType: UserType;
  email: string;
  name: string;
  title: string;
  linkedinLink: string;
  seated: boolean;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ChatMessage
// ====================================================

export interface ChatMessage_user {
  __typename: "User";
  id: number;
  userType: UserType;
  email: string;
  name: string;
  title: string;
  linkedinLink: string;
  seated: boolean;
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
  startTime: string;
  endTime: string;
  userCapacity: number;
  eventName: string;
  orgName: string;
  description: string;
}

export interface EventTableInput {
  eventId: number;
  head: number;
  name: string;
  description: string;
  userCapacity?: number | null;
}

export interface JoinTableInput {
  eventTableId: number;
  participantId: number;
}

export interface SurveyInput {
  questionId: number;
  answer: string;
}

export interface UserInput {
  email: string;
  name: string;
  title: string;
  linkedinLink: string;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
