import { gql } from '@apollo/client'
import { fragmentUser } from './fetchUser'

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
  query FetchChatMessage {
    chatMessages {
      ...ChatMessage
    }
  }
  ${fragmentChatMessage}
`

export const subscribeChat = gql`
  subscription ChatSubscription {
    chatUpdates {
      ...ChatMessage
    }
  }
  ${fragmentChatMessage}
`