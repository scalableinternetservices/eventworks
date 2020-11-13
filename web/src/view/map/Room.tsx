import { useQuery } from '@apollo/client';
import * as React from 'react';
import { fetchEvent } from '../../graphql/fetchEvent';
import { FetchEvent, FetchEventVariables } from '../../graphql/query.gen';
import { Square } from './Square';

export function Room ({ eventId }: { eventId: number }) {
  const {data, refetch} = useQuery<FetchEvent, FetchEventVariables>(fetchEvent, {
    variables: { eventId }
  });

  const seatRow = {
    width: "240px",
    margin: "none"
  };
  const roomStyle = {
    width: "75%",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    margin: "auto"
  } as React.CSSProperties;

  let tableNum = 0;

  refetch

  return (
    <div className="room" style={roomStyle}>
      {data?.event.eventTables ? (data.event.eventTables).map((e, i) =>
        <div className="square-row" style={seatRow}>
          {renderSquare(tableNum++, eventId, e.id)}
        </div>
      ) : <div className="empty"/> }
    </div>
  );
}

function renderSquare(i: number, eventId: number, eventTableId: number) {
  const arrangementStyle = {
    display: "inline-block",
    textAlign: "center",
    margin: "10px 20px"
  } as React.CSSProperties;

  return (
    <div className="square-group" style={arrangementStyle}>
      <Square eventId={eventId} eventTableId={eventTableId}/>
      <label style={{display: "block"}}>Table {i+1}</label>
    </div>
  );
}