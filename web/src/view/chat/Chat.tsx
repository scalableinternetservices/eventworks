import { useQuery, useSubscription } from '@apollo/client'
import * as React from 'react'
import { useEffect, useState } from 'react'
import { fetchTableInfo } from '../../graphql/fetchEvent'
import { ChatMessage, ChatSubscription, FetchChatMessage, FetchTableInfo, FetchTableInfoVariables } from '../../graphql/query.gen'
import { UpArrow } from '../../style/arrow'
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
  height: 'calc(100vh - 66px - 45px - 125px)',
  position: 'relative',
  padding: 15,
  overflow: 'auto'
} as React.CSSProperties

const chatHeaderView = {
  backgroundColor: 'wheat',
  padding: 15,
  textAlign: 'center',
  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.5)',
  borderBottomLeftRadius: 10,
  borderBottomRightRadius: 10
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
  maxHeight: MAX_TEXTBOX_HEIGHT,
  backgroundColor: '#f6f6f6'
} as React.CSSProperties

export const ChatBox = ({ eventId, tableId, user }: ChatBoxProps) => {
  const [messages, setMessages] = useState<Array<ChatMessage>>([])
  const [currentMessage, setCurrentMessage] = useState('')
  const [firstLoad, setFirstLoad] = useState(true)
  const [reachedTop, setReachedTop] = useState(false)

  const {
    loading: tableLoading,
    data: tableData,
    error: tableError
  } = useQuery<FetchTableInfo, FetchTableInfoVariables>(fetchTableInfo, {
    variables: { tableId }
  })

  const {
    loading: chatLoading,
    data: chatData,
    refetch: refetchChat
  } = useQuery<FetchChatMessage>(fetchChatMessage, {
    variables: {
      eventId,
      tableId,
    },
    skip: true // don't refetch chat every time we send a message (making this false makes the chat fully rerender constantly)
  })

  // store local chat messages once fetched
  useEffect(() => {
    if (!chatLoading && firstLoad && chatData?.chatMessages) {
      setMessages(chatData.chatMessages)
      setFirstLoad(false)
    }
  }, [chatLoading])

  // receive new chat updates
  const sub = useSubscription<ChatSubscription>(subscribeChat, {
    variables: { eventId, tableId }
  })

  useEffect(() => {
    if (sub.data?.chatUpdates) {
      setMessages([...messages, sub.data.chatUpdates])
    }
  }, [sub.data])

  // when up arrow pressed to load more chat, refetch next page of data
  const loadMoreChat = () => {
    if (!reachedTop) {
      refetchChat({ offset: messages.length })
        .then(chatData => {
          if (chatData.data.chatMessages.length) {
            setMessages([...chatData.data.chatMessages, ...messages])
          } else {
            setReachedTop(true) // hide up arrow
          }
        })
    }
  }

  // deals with refetching chat messages automatically when switching tables while chat window is open
  useEffect(() => {
    refetchChat({ tableId, offset: 0 })
      .then(data => setMessages(data.data.chatMessages || []))
  }, [tableId])

  // sending a new chat message
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key == 'Enter' && currentMessage && user.user) {
      sendChatMessage(user.user.id, eventId, tableId, currentMessage)
        .then(() => setCurrentMessage(''))
    }
  }

  if (!user?.user) {
    return <div style={chatBoxView}>Log in to view chat</div>
  }

  if (tableLoading || chatLoading) {
    return <div style={chatBoxView}>Loading chat...</div>
  }

  if (!tableData?.tableInfo) {
    console.error(tableError)
    return <div style={chatBoxView}>Error loading chat. Please try again.</div>
  }

  return (
    <>
      <H2 style={chatHeaderView}>{tableData.tableInfo.name}</H2>
      <div style={{ visibility: reachedTop ? 'hidden' : 'inherit' }}>
        <UpArrow onClick={loadMoreChat} />
      </div>
      <div style={chatBoxView}>
        {!messages.length ?
          <div style={{ marginBottom: 7 }}>The chat room is open, start chatting!</div> :
          <div style={chatMessagesView}>
            {messages.map(msg => (
              <div style={{ marginBottom: 7 }}>
                <b>{msg?.user.name}:</b> {msg?.message}
              </div>
            ))}
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