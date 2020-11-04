import { ApolloClient, gql } from '@apollo/client'
import { getApolloClient } from './apolloClient'
import { CreateEvent, CreateEventVariables } from './query.gen'

const createEventMutation = gql`
 mutation CreateEvent(
  $startTime: String!
  $endTime: String!
  $userCapacity: String!
  $eventName: String!
  $orgName: String!
  $description: String!){
   createEvent(
     input: {
       eventName: $eventName
       description: $description
       orgName: $orgName
       startTime: $startTime
       endTime: $endTime
       userCapacity: $userCapacity
     }
   )
 }
`
export function createEvent(client: ApolloClient<any>, input: CreateEventVariables){
 return getApolloClient().mutate<CreateEvent, CreateEventVariables>({
   mutation: createEventMutation,
   variables: {
    eventName: input.eventName,
    description: input.description,
    orgName: input.orgName,
    startTime: input.startTime,
    endTime: input.endTime,
    userCapacity: input.userCapacity
    },
 })
}

