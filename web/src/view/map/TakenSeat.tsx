import * as React from 'react';

const sitStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'rgba(0, 0, 0, 0.8)',
  borderRadius: "50%",
  height: 36,
  width: 36,
  margin: "10px 6px",
  color: 'white',
  boxShadow: '0 0 5px rgba(0, 0, 0, 0.3)'
}

export function TakenSeat({ tableSeat, username }: { tableSeat: number, username: string }) {
  const initials = username.split(' ').slice(0, 2).map(name => name[0]).join('')
  return (
    <div className={"seat-" + tableSeat} style={sitStyle} >
      {initials}
    </div>
  )
}