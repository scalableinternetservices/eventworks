import { useQuery, useSubscription } from '@apollo/client'
import * as React from 'react'
import { useContext, useEffect, useState } from 'react'
import { ChatMessage, ChatSubscription, FetchChatMessage } from '../../graphql/query.gen'
import { UserContext } from '../auth/user'
import { fetchChatMessage, subscribeChat } from './fetchChat'
import { sendChatMessage } from './mutateChat'

export const ChatBox = () => {
  const user = useContext(UserContext)
  const { loading, data } = useQuery<FetchChatMessage>(fetchChatMessage, {
    variables: {
      eventId: 1,
      tableId: 1
    }
  })
  const sub = useSubscription<ChatSubscription>(subscribeChat, {
    variables: {
      eventId: 1,
      tableId: 1
    }
  })
  const [messages, setMessages] = useState<Array<ChatMessage>>([])
  const [currentMessage, setCurrentMessage] = useState('')

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key == 'Enter' && user?.user) {
      sendChatMessage(user.user.id, 1, 1, currentMessage)
        .then(() => setCurrentMessage(''))
    }
  }

  useEffect(() => {
    if (data?.chatMessages) {
      setMessages(data.chatMessages)
    }
  }, [loading])

  useEffect(() => {
    if (sub.data?.chatUpdates) {
      setMessages([...messages, sub.data.chatUpdates])
    }
  }, [sub.data])

  if (!user?.user) {
    return null
  }

  if (loading) {
    return <div>Loading chat...</div>
  }

  return (
    <div>
      {!messages.length ?
        <div style={{ marginBottom: 7 }}>The chat room is open, start chatting!</div> :
        messages.map(msg => (
          <div style={{ marginBottom: 7 }}>
            <b>{`${msg?.user.name}`}:</b> {msg?.message}
          </div>)
        )}
      <input type="text"
        placeholder="Type your message..."
        value={currentMessage}
        onKeyDown={handleKeyDown}
        onChange={e => setCurrentMessage(e.target.value)}
        style={{ marginTop: 5, border: '2px solid black', width: '100%' }}
      />
    </div>
  )
}