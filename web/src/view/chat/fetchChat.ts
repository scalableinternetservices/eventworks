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
  query FetchChatMessage($eventId: Int!, $tableId: Int!) {
    chatMessages(eventId: $eventId, tableId: $tableId) {
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