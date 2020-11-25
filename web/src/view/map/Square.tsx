import { useQuery, useSubscription } from '@apollo/client';
import * as React from 'react';
import { getApolloClient } from '../../graphql/apolloClient';
import { fetchTable } from '../../graphql/fetchEvent';
import { EventTable, EventTableSubscription, EventTableSubscriptionVariables, FetchTable, FetchTableVariables } from '../../graphql/query.gen';
import { LoggedInUserCtx } from '../auth/user';
import { subscribeEventTable } from '../event/fetchEventTable';
import { switchTable } from '../event/mutateSwitchTable';
import { handleError } from '../toast/error';
import { toast } from '../toast/toast';
import { TakenSeat } from './TakenSeat';
import { UntakenSeat } from './UntakenSeat';

interface SquareProps {
  mainEventTableId: number
  table: EventTable
  user: LoggedInUserCtx
  clientTableId: number
}

export function Square ({
  mainEventTableId,
  table,
  user,
  clientTableId
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
      eventTableId,
      participantId: user.user.id
    }).then(result => {
      const table = result.data?.switchTable
      if (!table) {
        throw Error('Error joining table!')
      }
      toast(`Switched to table ${clientTableId}!`)
      refetchTableData()
    }).catch(handleError)
  }

  const tableStyle = {
    background: "#fbc02d",
    height: "180px",
    width: "180px",
    margin: "10px",
    dispaly: "flex",
    flexWrap: "wrap",
  } as React.CSSProperties;

  const emptySeat = {
    display: "inline-block",
    opacity: "0",
    borderRadius: "50%",
    height: "36px",
    margin: "6px",
    width: "36px"
  }

  let seatPosition = 0;

  return (
    <div className="square" style={tableStyle}>
      {[...Array(eventTableData?.table ? eventTableData.table.participants?.length : 0)].map((e, i) =>
        (seatPosition == 4 ? (
          <>
            <div className={"seat " + seatPosition++} style={emptySeat} />
            <button onClick={e => handleSwitch(e, mainEventTableId)}>
              <TakenSeat tableSeat={seatPosition++}/>
            </button>
          </>
        ) : (
          <button onClick={e => handleSwitch(e, mainEventTableId)}>
            <TakenSeat tableSeat={seatPosition++}/>
          </button>
        )
      ))}
      {[...Array(8 - seatPosition)].map((e, i) =>
        (seatPosition == 4 ? (
          <>
            <div className={"seat " + seatPosition++} style={emptySeat} />
            <button onClick={e => handleSwitch(e, table.id)}>
              <UntakenSeat tableSeat={seatPosition++}/>
            </button>
          </>
        ) : (
          <button onClick={e => handleSwitch(e, table.id)}>
            <UntakenSeat tableSeat={seatPosition++}/>
          </button>
        )
      ))}
    </div>
  );
}