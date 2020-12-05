import * as React from 'react';
import { isClientSideRendered } from '../../../../common/src/context';
import { getApolloClient } from '../../graphql/apolloClient';
import { FetchEvent } from '../../graphql/query.gen';
import { LoggedInUserCtx } from '../auth/user';
import { switchTable } from '../event/mutateSwitchTable';
import { Sidebar } from './Sidebar';
import { Square } from './Square';

const roomStyle = {
  width: "100vw",
  height: "calc(100vh - 66px)",
  justifyContent: "space-between",
  margin: "auto",
  position: "absolute",
  top: 66,
  left: 0,
  display: "flex",
} as React.CSSProperties;

const tablesStyle = {
  display: "flex",
  justifyContent: "center",
  maxWidth: "75vw",
  flexWrap: "wrap",
} as React.CSSProperties

const arrangementStyle = {
  display: "inline-block",
  textAlign: "center",
  margin: "10px 20px"
} as React.CSSProperties;

interface RoomProps {
  event: FetchEvent
  user: LoggedInUserCtx
}

export function Room ({ event, user }: RoomProps) {
  const tables = event.event.eventTables

  if (!tables) {
    return null
  }

  const sortedTables = [...tables].sort((tbl1, tbl2) => tbl1.id - tbl2.id)
  const mainEventTableId = sortedTables[0].id
  const [userTableId, setUserTableId] = React.useState(0)

  const leaveTableOnUnmount = () => {
    switchTable(getApolloClient(), {
      eventTableId: null, // leave event
      participantId: user.user.id
    })
  }

  React.useEffect(() => {
    if (isClientSideRendered()) {
      // on window close, leave the event
      // this is actually inconsistent and unreliable. need to set up background process on server to handle expiration for leaving
      window.onunload = leaveTableOnUnmount
    }

    return leaveTableOnUnmount
  }, [])

  React.useEffect(() => {
    switchTable(getApolloClient(), {
      eventTableId: mainEventTableId,
      participantId: user.user.id
    }).then(() => setUserTableId(mainEventTableId))
  }, [])

  console.log(sortedTables)

  return (
    <div className="room" style={roomStyle}>
      <div className="tables" style={tablesStyle}>
        {(sortedTables || []).map((table, i) =>
          i != 0 ? (
            <div className="square-group" style={arrangementStyle}>
              <Square
                mainEventTableId={mainEventTableId}
                table={table}
                user={user}
                tableNumber={i}
                setUserTableId={(id: number) => setUserTableId(id)}
                userTableId={userTableId}
              />
              <label style={{ display: "block", fontWeight: 600 }}>{table.name}</label>
            </div>
          ) : null
        )}
      </div>
      <Sidebar event={event} user={user} userTableId={userTableId} />
    </div>
  );
}