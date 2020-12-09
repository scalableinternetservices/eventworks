import { useQuery, useSubscription } from '@apollo/client';
import * as React from 'react';
import { getApolloClient } from '../../graphql/apolloClient';
import { fetchTable } from '../../graphql/fetchEvent';
import { EventTable, EventTableSubscription, EventTableSubscriptionVariables, FetchEvent, FetchTable, FetchTableVariables } from '../../graphql/query.gen';
import { LoggedInUserCtx } from '../auth/user';
import { subscribeEventTable } from '../event/fetchEventTable';
import { switchTable } from '../event/mutateSwitchTable';
import { handleError } from '../toast/error';
import { toast } from '../toast/toast';
import { JoinTableButton } from './JoinTableButton';
import { TakenSeat } from './TakenSeat';
import { UntakenSeat } from './UntakenSeat';

const NUM_ROWS = 3
const NUM_COLS = 3
const NUM_SEATS_DISPLAY = NUM_ROWS * NUM_COLS

const tableStyle = {
  background: "#fbc02d",
  height: 180,
  width: 180,
  margin: 10,
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  padding: 5,
  boxShadow: '3px 3px 10px rgba(0, 0, 0, 0.5)',
  borderRadius: 5
} as React.CSSProperties;

const rowStyle = {
  padding: 0,
  margin: 0,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center'
}

interface SquareProps {
  event: FetchEvent
  mainEventTableId: number
  table: EventTable
  user: LoggedInUserCtx
  tableNumber: number
  setUserTableId: Function
  userTableId: number
}

export function Square ({
  event,
  mainEventTableId,
  table,
  user,
  setUserTableId,
  userTableId
}: SquareProps) {
  const  {data: eventTableData, refetch: refetchTableData } = useQuery<FetchTable, FetchTableVariables>(fetchTable, {
    variables: { tableId: table.id },
    fetchPolicy: 'no-cache'
  });

  const sub = useSubscription<EventTableSubscription, EventTableSubscriptionVariables>(subscribeEventTable, {
    variables: { eventTableId: table.id },
  })

  React.useEffect(() => {
    if (sub.data?.tableUpdates) {
      refetchTableData()
    }
  }, [sub.data])

  const handleSwitch = (e: any, eventTableId: number | null) => {
    e.preventDefault()

    switchTable(getApolloClient(), {
      eventId: event.event.id,
      eventTableId,
      participantId: user.user.id
    }).then(result => {
      const table = result.data?.switchTable
      if (!table) {
        throw Error('Error joining table!')
      }
      toast(`Switched tables!`)
      setUserTableId(eventTableId)
      refetchTableData()
    }).catch(handleError)
  }

  let participants = eventTableData?.table || []
  let seats: React.ReactNode[] = []

  for (let seatPosition = 0; seatPosition < NUM_SEATS_DISPLAY; seatPosition++) {
    const isJoin = userTableId != table.id
    if (seatPosition == 4) {
      seats.push(
        <JoinTableButton
          onClick={(e: any) => handleSwitch(e, isJoin ? table.id : mainEventTableId)}
          isJoin={isJoin}
        />
      )
    } else {
      seats.push(seatPosition < participants.length ?
        <TakenSeat tableSeat={seatPosition} username={participants[seatPosition].name} /> :
        <UntakenSeat tableSeat={seatPosition} />)
    }
  }

  return (
    <div className="square" style={tableStyle}>
      {[...Array(NUM_ROWS)].map((_, i) => (
        <div className="row" style={rowStyle}>
          {[...Array(NUM_COLS)].map((_, j) => seats[NUM_ROWS*i + j])}
        </div>
      ))}
    </div>
  );
}