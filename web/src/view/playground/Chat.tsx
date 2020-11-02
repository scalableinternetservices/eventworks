import { useQuery, useSubscription } from '@apollo/client'
import * as React from 'react'
import { useEffect, useState } from 'react'
import { ChatMessage, ChatSubscription, FetchChatMessage } from '../../graphql/query.gen'
import { fetchChatMessage, subscribeChat } from './fetchChat'
import { sendChatMessage } from './mutateChat'

export const ChatBox = () => {
  const { loading, data } = useQuery<FetchChatMessage>(fetchChatMessage)
  const sub = useSubscription<ChatSubscription>(subscribeChat)
  const [messages, setMessages] = useState<Array<ChatMessage>>([])
  const [currentMessage, setCurrentMessage] = useState('')

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key == 'Enter') {
      sendChatMessage('clayton', currentMessage)
        .then(() => setCurrentMessage(''))
        .then(() => console.log(currentMessage))
    }
  }

  useEffect(() => {
    if (data?.chatMessages) {
      setMessages(data.chatMessages)
    }
  }, [loading])

  useEffect(() => {
    console.log(sub)
    if (sub.data?.chatUpdates) {
      setMessages([...messages, sub.data.chatUpdates])
    }
  }, [sub.data])

  if (loading) {
    return <div>Loading chat...</div>
  }

  return (
    <div>
      {!messages.length ?
        <div style={{ marginBottom: 7 }}>The chat room is open, start chatting!</div> :
        messages.map(msg => <div style={{ marginBottom: 7 }}>{`${msg?.id}: ${msg?.message}`}</div>)}
      <input type="text"
        placeholder="Type your message..."
        value={currentMessage}
        onKeyDown={handleKeyDown}
        onChange={e => setCurrentMessage(e.target.value)}
        style={{ marginTop: 5, border: '2px solid black' }}
      />
    </div>
  )
}