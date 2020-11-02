import { gql } from '@apollo/client'
import { getApolloClient } from '../../graphql/apolloClient'
import { fragmentChatMessage } from './fetchChat'

const sendChatMessageMutation = gql`
  mutation SendChatMessage($senderId: Int!, $message: String!) {
    sendMessage(senderId: $senderId, message: $message) {
      ...ChatMessage
    }
  }
  ${fragmentChatMessage}
`

export function sendChatMessage(senderId: number, message: string) {
  return getApolloClient().mutate({
    mutation: sendChatMessageMutation,
    variables: { senderId, message }
  })
}