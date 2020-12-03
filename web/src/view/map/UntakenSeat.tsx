import * as React from 'react';

const seatStyle = {
  display: "inline-block",
  backgroundColor: "rgba(0, 0, 0, 0.2)",
  borderRadius: "50%",
  height: "36px",
  width: "36px",
  margin: "10px 6px",
  boxShadow: 'inset 0 0 5px rgba(0, 0, 0, 0.3)'
}

export const UntakenSeat = ({ tableSeat }:{ tableSeat: number }) => <div className={"seat-" + tableSeat} style={seatStyle} />
