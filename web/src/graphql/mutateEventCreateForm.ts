import { ApolloClient, gql } from '@apollo/client'
import { getApolloClient } from './apolloClient'
import { fragmentEvent } from './fetchEvent'
import { CreateEvent, CreateEventVariables, EventInput } from './query.gen'

const createEventMutation = gql`
 mutation CreateEvent($input: EventInput!){
    createEvent(input: $input) {
      id
      name
      description
      startTime
      endTime
      orgName
      userCapacity
      ...Event
    }
  }
  ${fragmentEvent}
`
export function createEvent(client: ApolloClient<any>, input: EventInput){
  console.log(input)
  return getApolloClient().mutate<CreateEvent, CreateEventVariables>({
   mutation: createEventMutation,
   variables: { input },
 })
}