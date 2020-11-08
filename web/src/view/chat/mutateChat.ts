import { gql } from '@apollo/client'
import { getApolloClient } from '../../graphql/apolloClient'
import { fragmentChatMessage } from './fetchChat'

const sendChatMessageMutation = gql`
  mutation SendChatMessage($senderId: Int!, $eventId: Int!, $tableId: Int!, $message: String!) {
    sendMessage(senderId: $senderId, eventId: $eventId, tableId: $tableId, message: $message) {
      ...ChatMessage
    }
  }
  ${fragmentChatMessage}
`

export function sendChatMessage(senderId: number, eventId: number, tableId: number, message: string) {
  return getApolloClient().mutate({
    mutation: sendChatMessageMutation,
    variables: { senderId, eventId, tableId, message }
  })
}