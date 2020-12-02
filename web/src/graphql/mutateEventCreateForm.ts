import { ApolloClient, gql } from '@apollo/client'
import { getApolloClient } from './apolloClient'
import { fragmentEvent } from './fetchEvent'
import { CreateEvent, CreateEventVariables, EventInput } from './query.gen'

const createEventMutation = gql`
 mutation CreateEvent($input: EventInput!){
    createEvent(input: $input) {
      ...Event
    }
  }
  ${fragmentEvent}
`
export function createEvent(client: ApolloClient<any>, input: EventInput){
  return getApolloClient().mutate<CreateEvent, CreateEventVariables>({
   mutation: createEventMutation,
   variables: { input },
 })
}