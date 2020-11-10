import { useQuery, useSubscription } from '@apollo/client'
import * as React from 'react'
import { useContext, useEffect, useState } from 'react'
import { fetchTable } from '../../graphql/fetchEvent'
import { ChatMessage, ChatSubscription, FetchChatMessage, FetchTable } from '../../graphql/query.gen'
import { H2 } from '../../style/header'
import { UserContext } from '../auth/user'
import { fetchChatMessage, subscribeChat } from './fetchChat'
import { sendChatMessage } from './mutateChat'

interface ChatBoxProps {
  eventId: number
  tableId: number
}

export const ChatBox = ({ eventId, tableId }: ChatBoxProps) => {
  const user = useContext(UserContext)
  const {
    loading: tableLoading,
    data: tableData,
    error: tableError
  } = useQuery<FetchTable>(fetchTable, {
    variables: { tableId }
  })
  const { loading: chatLoading, data: chatData } = useQuery<FetchChatMessage>(fetchChatMessage, {
    variables: { eventId, tableId }
  })
  const sub = useSubscription<ChatSubscription>(subscribeChat, {
    variables: { eventId, tableId }
  })
  const [messages, setMessages] = useState<Array<ChatMessage>>([])
  const [currentMessage, setCurrentMessage] = useState('')

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key == 'Enter' && currentMessage && user?.user) {
      sendChatMessage(user.user.id, eventId, tableId, currentMessage)
        .then(() => setCurrentMessage(''))
    }
  }

  useEffect(() => {
    if (chatData?.chatMessages) {
      setMessages(chatData.chatMessages)
    }
  }, [chatLoading])

  useEffect(() => {
    if (sub.data?.chatUpdates) {
      setMessages([...messages, sub.data.chatUpdates])
    }
  }, [sub.data])

  if (!user?.user) {
    return <div>Log in to view chat</div>
  }

  if (tableLoading || chatLoading) {
    return <div>Loading chat...</div>
  }

  if (!tableData?.table) {
    console.error(tableError)
    return <div>Error loading chat. Please try again.</div>
  }

  return (
    <div>
      <H2 style={{ marginBottom: 10 }}>{tableData.table.name}</H2>
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
        style={{ marginTop: 5, border: '1px solid black', width: '100%' }}
      />
    </div>
  )
}