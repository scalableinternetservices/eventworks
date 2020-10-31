import { useQuery, useSubscription } from '@apollo/client'
import * as React from 'react'
import { useEffect, useState } from 'react'
import { ChatMessage, ChatSubscription, FetchChatMessage } from '../../graphql/query.gen'
import { fetchChatMessage, subscribeChat } from './fetchChat'

export const ChatBox = () => {
  const { loading, data } = useQuery<FetchChatMessage>(fetchChatMessage)
  const sub = useSubscription<ChatSubscription>(subscribeChat)
  const [messages, setMessages] = useState<Array<ChatMessage>>([])

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

  if (loading) {
    return <div>Loading chat...</div>
  } else if (!messages.length) {
    return <div>The chat room is open, start chatting!</div>
  }

  return (
    <div>
      {messages.map(msg => <div>{`${msg?.id}: ${msg?.message}`}</div>)}
    </div>
  )
}