import { useQuery, useSubscription } from '@apollo/client';
import * as React from 'react';
import { getApolloClient } from '../../graphql/apolloClient';
import { fetchEvent, fetchTable, subscribeEventTable } from '../../graphql/fetchEvent';
import { EventTableSubscription, EventTableSubscriptionVariables, FetchEvent, FetchEventVariables, FetchTable, FetchTableVariables, FetchUserContext, User } from '../../graphql/query.gen';
import { fetchUser } from '../auth/fetchUser';
import { joinTable } from '../event/mutateJoinTable';
import { leaveTable } from '../event/mutateLeaveTable';
import { handleError } from '../toast/error';
import { toast } from '../toast/toast';

export function Square ({ eventId, eventTableId }: { eventId: number, eventTableId: number }) {
  const {data: eventTableData, refetch: refetchTableData} = useQuery<FetchTable, FetchTableVariables>(fetchTable, {
    variables: { tableId: eventTableId }
  });
  const {data: userData, refetch: refetchUserData} = useQuery<FetchUserContext, User>(fetchUser);
  const {data: eventData, refetch} = useQuery<FetchEvent, FetchEventVariables>(fetchEvent, {
    variables: { eventId }
  });
  const [takenSeats, setTakenSeats] = React.useState<number>(0)

  const sub = useSubscription<EventTableSubscription, EventTableSubscriptionVariables>(subscribeEventTable, {
    variables: { eventTableId },
  })
  React.useEffect(() => {
    if (sub.data?.tableUpdates) {
      setTakenSeats((sub.data.tableUpdates.participants || []).length)
    }
    console.log(sub.data?.tableUpdates)
  }, [sub.data])

  let userIdTemp:number = 0;

  if (userData?.self?.id) {
    userIdTemp = userData.self.id;
  }

  const handleJoin = (event: any) => {
    event.preventDefault();

    joinTable(getApolloClient(), {
      eventTableId: eventTableId,
      participantId: userIdTemp
    }).then((result) => {
      refetch
      refetchUserData
      console.log(eventData)
      toast('Joined Table!');
    }).then(() => {
      refetchTableData
      console.log(eventTableData)
    }).catch(err => {
      handleError(err)
    })
  }

  const handleLeave = (event: any) => {
    event.preventDefault();

    leaveTable(getApolloClient(), {
      eventTableId: eventTableId,
      participantId: userIdTemp
    }).then((result) => {
      refetch
      refetchUserData

      toast('Left Table!');
    }).then(() => {
      refetchTableData
      console.log(eventTableData)
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

  let seatPosition = 0;

  return (
    <div className="square" style={tableStyle}>
      {[...Array(takenSeats)].map((e, i) =>
        renderSeat(seatPosition++, true)
      )}
      {[...Array(8 - takenSeats)].map((e, i) =>
        renderSeat(seatPosition++, false)
      )}
    </div>
  );

  function renderSeat(i: number, x: boolean) {
    const seatStyle = {
      display: "inline-block",
      backgroundColor: "#000000",
      opacity: "0.2",
      borderRadius: "50%",
      height: "36px",
      width: "36px",
      margin: "10px 6px"
    };
    const seatStyleAdjusted = {
      display: "inline-block",
      backgroundColor: "#000000",
      opacity: "0.2",
      borderRadius: "50%",
      height: "36px",
      width: "36px",
      margin: "10px 6px 10px 50px"
    };
    const sitStyle = {
      display: "inline-block",
      backgroundColor: "#000000",
      opacity: "1",
      borderRadius: "50%",
      height: "36px",
      width: "36px",
      margin: "10px 6px"
    }
    const sitStyleAdjusted = {
      display: "inline-block",
      backgroundColor: "#000000",
      opacity: "1",
      borderRadius: "50%",
      height: "36px",
      width: "36px",
      margin: "10px 6px 10px 50px"
    }
    const horizontalPlus = {
      position: "relative",
      backgroundColor: "#ffffff",
      width: "50%",
      height: "12.5%",
      left: "25%",
      top: "43.75%"
    } as React.CSSProperties;
    const verticalPlus = {
      position: "relative",
      backgroundColor: "#ffffff",
      width: "12.5%",
      height: "50%",
      left: "43.75%",
      top: "12.5%"
    } as React.CSSProperties;

    const seated = true // temp stub

    if (x) {
      return (
        <div className={"seat " + i} style={i == 4 ? sitStyleAdjusted : sitStyle} >
        </div>

      )
    } else {
      return (
        <div className={"seat " + i} style={seated ? (i == 4 ? sitStyleAdjusted : sitStyle) : (i == 4 ? seatStyleAdjusted : seatStyle)} onClick={seated ? handleLeave : handleJoin} >
          <div className='horizontalPlus' style={horizontalPlus}></div>
          <div className='verticalPlus' style={seated ? {display: "none"} : verticalPlus }></div>
        </div>
      )
    }
  }
}