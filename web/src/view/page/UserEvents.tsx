import * as React from 'react';
import { FetchUserContext_self_hostedEvents } from '../../graphql/query.gen';
import { H2, H3 } from '../../style/header';

interface eventProps {
  event: FetchUserContext_self_hostedEvents
}

const eventBox = {
  width: "75vw",
  height: "100px",
  borderLeft: "12px solid #FFD100",
  background: "#2774AE"
} as React.CSSProperties

const eventBoxHover = {
  width: "75vw",
  height: "100px",
  borderLeft: "12px solid #ffee9e",
  background: "#7eabcc"
} as React.CSSProperties


export function UserEvents({event}: eventProps) {
  const [hover, setHover] = React.useState(false);
  return (
    <>
      <div className="eventBox" style={hover ? eventBoxHover : eventBox} onMouseEnter={e => {setHover(true);}} onMouseLeave={e => {setHover(false)}}>
        <span style={hover ? {display: "none"} : {display: "auto"}}>
          <H2 style={{marginLeft: 10, marginTop: 10, color: "#fff"}}>ID{event.id} | {event.name}</H2>
        </span>
        <H3 style={hover ? {display: "block"} : {display: "none"}}>Your event link is </H3>
      </div>
    </>
  )
}