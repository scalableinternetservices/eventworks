import { useQuery } from '@apollo/client';
import * as React from 'react';
import { fetchEvent } from '../../graphql/fetchEvent';
import { EventTable, FetchEvent, FetchEventVariables } from '../../graphql/query.gen';
import { Square } from './Square';

export function Room ({ eventId }: { eventId: number }) {
  const {data, refetch} = useQuery<FetchEvent, FetchEventVariables>(fetchEvent, {
    variables: { eventId }
  });
  const [tables, setTables] = React.useState<Array<EventTable>>(data?.event.eventTables ? data?.event.eventTables : [])

  React.useEffect(() => {
    if (data?.event && data.event.eventTables) {
      if (tables.length != data.event.eventTables.length) {
        refetch()
        setTables(data.event.eventTables)
      }
    }
  })

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

  return (
    <div className="room" style={roomStyle}>
      {tables.map((e, i) =>
        i != 0 ?
        <div className="square-row" style={seatRow}>
          {renderSquare(tableNum++, eventId, e.id)}
        </div> : ""
      )}
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