import { gql } from '@apollo/client'
import { getApolloClient } from '../../graphql/apolloClient'
import { fragmentChatMessage } from './fetchChat'

const sendChatMessageMutation = gql`
  mutation SendChatMessage($from: String!, $message: String!) {
    sendMessage(from: $from, message: $message) {
      ...ChatMessage
    }
  }
  ${fragmentChatMessage}
`

export function sendChatMessage(from: string, message: string) {
  return getApolloClient().mutate({
    mutation: sendChatMessageMutation,
    variables: { from, message }
  })
}