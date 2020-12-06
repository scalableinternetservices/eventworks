import { useQuery, useSubscription } from '@apollo/client';
import * as React from 'react';
import { EventTableSubscription, EventTableSubscriptionVariables, FetchEvent, FetchUsersAtTable, FetchUsersAtTableVariables } from '../../graphql/query.gen';
import { fetchUsersAtTable } from '../auth/fetchUser';
import { LoggedInUserCtx } from '../auth/user';
import { ChatBox } from '../chat/Chat';
import { subscribeEventTable } from '../event/fetchEventTable';
import { UserTab } from './Tab';

interface SidebarProps {
  event: FetchEvent,
  user: LoggedInUserCtx,
  userTableId: number,
}

const sideBar = {
  right: 0,
  bottom: 0,
  height: "calc(100vh - 66px)",
  width: "25vw",
  backgroundColor: '#f6f6f6',
  borderLeft: "2px solid #e3e3e3",
  padding: 0,
  overflow: 'hidden',
  position: 'relative'
} as React.CSSProperties;

const tabButton = {
  width: "50%",
  padding: 10
}

const buttonNotActive = {
  outline: "0px solid #000",
  background: "#fddf96",
  ...tabButton
}

const buttonActive = {
  background: "#fbc02d",
  ...tabButton
}

const buttons = {
  display: "flex"
}

export function Sidebar ({ event, user, userTableId }: SidebarProps) {
  const { data, refetch } = useQuery<FetchUsersAtTable, FetchUsersAtTableVariables>(fetchUsersAtTable, {
    variables: { tableId: userTableId }
  })
  const [userChatOpen, setUserChatOpen] = React.useState(false)
  const [userList, setUserList] = React.useState(data?.usersAtTable ? data.usersAtTable : [])

  const sub = useSubscription<EventTableSubscription, EventTableSubscriptionVariables>(subscribeEventTable, {
    variables: { eventTableId: userTableId },
  })

  React.useEffect(() => {
    if (sub.data?.tableUpdates) {
      refetch()
        .then(data => {
          setUserList(data?.data.usersAtTable || [])
        })
    }
  }, [sub.data])

  React.useEffect(() => {
    refetch()
      .then(data => {
        setUserList(data?.data.usersAtTable || [])
      })
  }, [userTableId])

  const switchSidebarView = () => {
    setUserChatOpen(!userChatOpen);
  }

  const doNothing = () => {}

  return (
    <div className="sidebar" style={sideBar}>
      <div className="buttons" style={buttons}>
        <button className="userlist" style={userChatOpen ? buttonNotActive : buttonActive} onClick={userChatOpen ? switchSidebarView : doNothing}>Users</button>
        <button className="tableChat" style={userChatOpen ? buttonActive : buttonNotActive} onClick={userChatOpen ? doNothing : switchSidebarView}>Table Chat</button>
      </div>
      {userChatOpen ?
        <ChatBox eventId={event.event.id} tableId={userTableId} user={user} /> :
        userList.map(userElem => <UserTab name={userElem.name}/>)}
    </div>
  );
}
