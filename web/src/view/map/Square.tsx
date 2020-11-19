import { useQuery, useSubscription } from '@apollo/client';
import * as React from 'react';
import { getApolloClient } from '../../graphql/apolloClient';
import { fetchTable } from '../../graphql/fetchEvent';
import { EventTableSubscription, EventTableSubscriptionVariables, FetchTable, FetchTableVariables, FetchUserContext, User } from '../../graphql/query.gen';
import { fetchUser } from '../auth/fetchUser';
import { subscribeEventTable } from '../event/fetchEventTable';
import { joinTable } from '../event/mutateJoinTable';
import { leaveTable } from '../event/mutateLeaveTable';
import { handleError } from '../toast/error';
import { toast } from '../toast/toast';
import { TakenSeat } from './TakenSeat';
import { UntakenSeat } from './UntakenSeat';


export function Square ({ eventId, eventTableId }: { eventId: number, eventTableId: number }) {
  const {data: eventTableData, refetch: refetchTableData} = useQuery<FetchTable, FetchTableVariables>(fetchTable, {
    variables: { tableId: eventTableId }
  });

  const {data: userData, } = useQuery<FetchUserContext, User>(fetchUser);

  //const [tables, setTables] = React.useState<Array<EventTable>>([])

  const sub = useSubscription<EventTableSubscription, EventTableSubscriptionVariables>(subscribeEventTable, {
    variables: { eventTableId },
  })

  React.useEffect(() => {
    if (sub.data?.tableUpdates) {

    }
  }, [sub.data])

  const handleJoin = (e: any) => {
    e.preventDefault()

    joinTable(getApolloClient(), {
        eventTableId: eventTableId,
        participantId: userData?.self?.id || 0
        }).then(result => {
          console.log(result)
          if  (!result.data?.joinTable.id) {
            throw Error('Error joining table!')
          }
          toast('Joined Table!')
          refetchTableData()

        }).catch(err => {
          handleError(err)
        })
      }

  const handleLeave = (e: any) => {
    e.preventDefault()

    leaveTable(getApolloClient(), {
        eventTableId: eventTableId,
        participantId: userData?.self?.id || 0
        }).then(result => {
          if  (!result.data?.leaveTable.id) {
            throw Error('Error leaving table!')
          }
          toast('Left Table!')
          refetchTableData()

        }).catch(err => {
          handleError(err)
        })
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
        (seatPosition == 4 ? <><div className={"seat " + seatPosition++} style={emptySeat} /> <button onClick={handleLeave}><TakenSeat tableSeat={seatPosition++}/></button></> : <button onClick={handleLeave}><TakenSeat tableSeat={seatPosition++}/></button>)
      )}
      {[...Array(8 - seatPosition)].map((e, i) =>
        (seatPosition == 4 ? <><div className={"seat " + seatPosition++} style={emptySeat} />  <button onClick={handleJoin}><UntakenSeat tableSeat={seatPosition++}/> </button> </>: <button onClick={handleJoin}><UntakenSeat tableSeat={seatPosition++}/></button>)
      )}
    </div>
  );
}