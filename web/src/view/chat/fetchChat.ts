import { gql } from '@apollo/client'
import { fragmentUser } from '../auth/fetchUser'

export const fragmentChatMessage = gql`
  fragment ChatMessage on ChatMessage {
    id
    user {
      ...User
    }
    message
  }
  ${fragmentUser}
`

export const fetchChatMessage = gql`
  query FetchChatMessage($eventId: Int!, $tableId: Int!, $offset: Int! = 0) {
    chatMessages(eventId: $eventId, tableId: $tableId, offset: $offset) {
      ...ChatMessage
    }
  }
  ${fragmentChatMessage}
`

export const subscribeChat = gql`
  subscription ChatSubscription($eventId: Int!, $tableId: Int!) {
    chatUpdates(eventId: $eventId, tableId: $tableId) {
      ...ChatMessage
    }
  }
  ${fragmentChatMessage}
`