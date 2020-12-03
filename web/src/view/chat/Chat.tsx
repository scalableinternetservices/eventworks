import { useQuery, useSubscription } from '@apollo/client'
import * as React from 'react'
import { useEffect, useState } from 'react'
import { fetchTable } from '../../graphql/fetchEvent'
import { ChatMessage, ChatSubscription, FetchChatMessage, FetchTable } from '../../graphql/query.gen'
import { H2 } from '../../style/header'
import { LoggedInUserCtx } from '../auth/user'
import { fetchChatMessage, subscribeChat } from './fetchChat'
import { sendChatMessage } from './mutateChat'

interface ChatBoxProps {
  eventId: number,
  tableId: number,
  user: LoggedInUserCtx
}

const TEXTBOX_PADDING = 15
const MAX_TEXTBOX_HEIGHT = 30 + TEXTBOX_PADDING

const chatBoxView = {
  marginTop: 15,
  paddingLeft: 15,
  height: 'calc(100vh - 66px)',
  position: 'relative'
} as React.CSSProperties

const chatMessagesView = {
  height: `calc(100% - ${MAX_TEXTBOX_HEIGHT}px)`,
  width: "100%",
} as React.CSSProperties

const chatInputView = {
  marginTop: 5,
  borderTop: '1px solid gray',
  width: '100%',
  position: 'absolute',
  bottom: 0,
  padding: 15,
  maxHeight: MAX_TEXTBOX_HEIGHT
} as React.CSSProperties

export const ChatBox = ({ eventId, tableId, user }: ChatBoxProps) => {
  const {
    loading: tableLoading,
    data: tableData,
    error: tableError
  } = useQuery<FetchTable>(fetchTable, {
    variables: { tableId }
  })
  const { loading: chatLoading, data: chatData, refetch: refetchChat } = useQuery<FetchChatMessage>(fetchChatMessage, {
    variables: { eventId, tableId }
  })
  const sub = useSubscription<ChatSubscription>(subscribeChat, {
    variables: { eventId, tableId }
  })
  const [messages, setMessages] = useState<Array<ChatMessage>>([])
  const [currentMessage, setCurrentMessage] = useState('')

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key == 'Enter' && currentMessage && user.user) {
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

  // accounts for when switching tables while chat is open
  useEffect(() => {
    refetchChat()
      .then(data => setMessages(data.data.chatMessages || []))
  }, [tableId])

  if (!user?.user) {
    return <div style={chatBoxView}>Log in to view chat</div>
  }

  if (tableLoading || chatLoading) {
    return <div style={chatBoxView}>Loading chat...</div>
  }

  if (!tableData?.table) {
    console.error(tableError)
    return <div style={chatBoxView}>Error loading chat. Please try again.</div>
  }

  return (
    <>
      <div style={chatBoxView}>
        <H2 style={{ marginBottom: 10 }}>{tableData.table.name}</H2>
        {!messages.length ?
          <div style={{ marginBottom: 7 }}>The chat room is open, start chatting!</div> :
          <div style={chatMessagesView}> {messages.map(msg => (
            <div style={{ marginBottom: 7 }}>
              <b>{`${msg?.user.name}`}:</b> {msg?.message}
            </div>))}
          </div>
        }
      </div>
      <input type="text"
        placeholder="Type your message..."
        value={currentMessage}
        onKeyDown={handleKeyDown}
        onChange={e => setCurrentMessage(e.target.value)}
        style={chatInputView}
      />
    </>
  )
}