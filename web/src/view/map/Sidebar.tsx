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
  user: LoggedInUserCtx
}

const sideBar = {
  position: "absolute",
  right: "0",
  bottom: "0",
  height: "calc(100vh - 73px)",
  width: "20vw",
  backgroundColor: "#fff",
  border: "4px solid #000",
  overflow: "scroll",
} as React.CSSProperties;

const button_notactive = {
  outline: "0px solid #000",
  background: "#fddf96",
  width: "9.8vw",
  padding: "0"
}

const button_active = {
  borderRight: "2px solid #000",
  borderLeft: "2px solid #000",
  background: "#fbc02d",
  width: "9.8vw",
  padding: "0"
}

const buttons = {
  display: "flex"
}

export function Sidebar ({ event, user }: SidebarProps) {
  const {data, refetch} = useQuery<FetchUsersAtTable, FetchUsersAtTableVariables>(fetchUsersAtTable, {
    variables: { tableId: user.user.table ? user.user.table.id : 0 }
  })
  const [userChatOpen, setUserChatOpen] = React.useState(false)
  const [userList, setUserList] = React.useState(data?.usersAtTable ? data.usersAtTable : [])

  const sub = useSubscription<EventTableSubscription, EventTableSubscriptionVariables>(subscribeEventTable, {
    variables: { eventTableId: user.user.table ? user.user.table.id : 0 },
  })

  React.useEffect(() => {
    console.log(sub.data)
    if (sub.data?.tableUpdates) {
      refetch();
      console.log(data)
      setUserList(data?.usersAtTable ? data.usersAtTable : [])
      console.log(userList)
    }
  }, [sub.data])

  React.useEffect(() => {
    if (data?.usersAtTable) {
      setUserList(data?.usersAtTable ? data.usersAtTable : [])
    }
  });

  const switchSidebarView = () => {
    setUserChatOpen(!userChatOpen);
  }

  const doNothing = () => {

  }

  return (
    <div className="sidebar" style={sideBar}>
      <div className="buttons" style={buttons}>
        <button className="userlist" style={userChatOpen ? button_notactive : button_active} onClick={userChatOpen ? switchSidebarView : doNothing}>Users</button>
        <button className="tableChat" style={userChatOpen ? button_active : button_notactive} onClick={userChatOpen ? doNothing : switchSidebarView}>Table Chat</button>
      </div>
      { /* Other option which works for more cases
        <div style={userChatOpen ? {display: "block"} : {display: "none"}}>
          <ChatBox eventId={event.event.id} tableId={user.user.table ? user.user.table.id : 1} />
        </div>
        <div style={userChatOpen ? {display: "none"} : {display: "block"}}>
          {[...Array(userList.length)].map((i,e) => <UserTab name={userList[e].name}/>)}
        </div>*/
      }

      {userChatOpen ? <ChatBox eventId={event.event.id} tableId={user.user.table ? user.user.table.id : 1} user={user} /> : [...Array(userList.length)].map((i,e) => <UserTab name={userList[e].name}/>)}
    </div>
  );
}
