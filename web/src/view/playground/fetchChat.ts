import { gql } from '@apollo/client'

export const fragmentChatMessage = gql`
  fragment ChatMessage on ChatMessage {
    id
    message
  }
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