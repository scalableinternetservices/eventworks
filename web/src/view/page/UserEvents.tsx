import * as React from 'react';
import { FetchUserContext_self_hostedEvents } from '../../graphql/query.gen';
import { H2, H3, H4 } from '../../style/header';

interface eventProps {
  event: FetchUserContext_self_hostedEvents
}

const eventBox = {
  width: "75vw",
  height: "100px",
  borderLeft: "12px solid #FFD100",
  background: "#2774AE",
  marginBottom: "25px"
} as React.CSSProperties

const eventBoxHover = {
  width: "75vw",
  height: "100px",
  borderLeft: "12px solid #ffee9e",
  background: "#7eabcc",
  marginBottom: "25px"
} as React.CSSProperties


export function UserEvents({event}: eventProps) {
  const [hover, setHover] = React.useState(false);

  return (
    <>
      <div className="eventBox" style={hover ? eventBoxHover : eventBox} onMouseEnter={e => {setHover(true);}} onMouseLeave={e => {setHover(false)}}>
        <span style={hover ? {display: "none"} : {display: "block"}}>
          <H2 style={{marginLeft: 10, marginTop: 18, color: "#fff"}}>Event ID {event.id} | {event.name}</H2>
          <H4 style={{marginLeft: 10, marginTop: 5,color: "#fff"}}><span style={{fontWeight: "bold"}}>Capacity</span>: {event.userCapacity} <span style={{fontWeight: "bold", marginLeft: 20}}>Start Time</span>: {new Date(event.startTime).toLocaleDateString()} {new Date(event.startTime).toLocaleTimeString()} <span style={{marginLeft: 20, fontWeight: "bold"}}>End Time</span>: {new Date(event.endTime).toLocaleDateString()} {new Date(event.endTime).toLocaleTimeString()}</H4>
        </span>
        <H3 style={hover ? {display: "block", color: "#fff", marginLeft: 10, marginTop: 30} : {display: "none"}}>
          Your event link is <span style={{color:"#FFD100"}}>http://localhost:3000/app/findevent?eventID={event.id}</span>
        </H3>
      </div>
    </>
  )
}