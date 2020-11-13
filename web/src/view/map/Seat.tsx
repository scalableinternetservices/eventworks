/*import * as React from 'react';

export function Seat() {
  const seatStyle = {
    display: "inline-block",
    backgroundColor: "#000000",
    opacity: "0.2",
    borderRadius: "50%",
    height: "36px",
    width: "36px",
    margin: "6px"
  };
  const sitStyle = {
    display: "inline-block",
    backgroundColor: "#000000",
    opacity: "1",
    borderRadius: "50%",
    height: "36px",
    width: "36px",
    margin: "6px"
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

  return (
    <div className="seat" style={even ? sitStyle : seatStyle} onClick={seated ? handleLeave : handleJoin}>
      <div className='horizontalPlus' style={horizontalPlus}></div>
      <div className='verticalPlus' style={seated ? {display: "none"}: verticalPlus }></div>
    </div>
  );
}*/