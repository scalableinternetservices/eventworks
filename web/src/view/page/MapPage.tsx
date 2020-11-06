import { RouteComponentProps } from '@reach/router';
import * as React from 'react';
import { AppRouteParams } from '../nav/route';
import { Page } from './Page';

interface MapUI extends RouteComponentProps, AppRouteParams {}

export function MapPage(props: MapUI) {
  return (
    <Page>
      <Room />
    </Page>
  )
}

//,React.PropsWithChildren<JSX.IntrinsicElements['div']>

//////////////////////////////////////////////// Room

export class Room extends React.Component {
  render() {
    const seatRow = {
      margin: "10px"
    };

    return (
      <div className="room">
        <div className="square-row" style={seatRow}>
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
        </div>
        <div className="square-row" style={seatRow}>
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
        </div>
        <div className="square-row" style={seatRow}>
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
        </div>
      </div>
    );
  }

  renderSquare(i: number) {
    const arrangementStyle = {
      display: "inline-block",
      textAlign: "center",
      margin: "10px 20px"
    } as React.CSSProperties;

    return (
      <div className="square-group" style={arrangementStyle}>
      <Square handleClick/>
      <label style={{display: "block"}}>Table {i+1}</label>
      </div>
    );
  }
}

//////////////////////////////////////////////// Square

interface squareProps {
  handleClick: any
}
interface squareState {
  seats: Array<string>,
  occupants: number
}

class Square extends React.Component<squareProps, squareState> {
  constructor(props: squareProps) {
    super(props);
    this.handleClick = this.handleClick.bind(this); //pass the click handler down from parent
    this.state = {
      seats: Array(9).fill(null),
      occupants: 0
    };
  }

  handleClick() {
    //i csnt do this
    console.log("square clicked")
    alert('click');
    const seats = this.state.seats.slice();
    const occupants = this.state.occupants;
    //TODO: add logic so they cannot join the table if it's full (8 occupants)
    seats[occupants] = 'x';  //TODO: add profile pic of user that clicks on table
    this.setState({
      seats: seats,
      occupants: occupants+1
    });
  }

  render() {
    const seatRow = {
      margin: "10px"
    };
    const seatRowTop = {
      margin: "10px",
      paddingTop: "10px"
    };

    const tableStyle = {
      background: "#fbc02d",
      height: "180px",
      width: "180px",
      margin: "10px"
    }

    return (
      <div className="square" onClick={this.handleClick} style={tableStyle}>
        <div className="square-row" style={seatRowTop}>
          {this.renderSeat(0)}
          {this.renderSeat(1)}
          {this.renderSeat(2)}
        </div>
        <div className="square-row" style={seatRow}>
          {this.renderSeat(3)}
          {this.renderSeat(8)}
          {this.renderSeat(4)}
        </div>
        <div className="square-row" style={seatRow}>
          {this.renderSeat(5)}
          {this.renderSeat(6)}
          {this.renderSeat(7)}
        </div>
      </div>
    );
  }

  renderSeat(i: number) {
    const emptySeat = {
      display: "inline-block",
      opacity: "0",
      borderRadius: "50%",
      height: "36px",
      margin: "6px",
      width: "36px"
    }

    if (i == 8){
      return (
        <div className="empty" style={emptySeat}>
        </div>
      )
    } else {
      return (
        <Seat value={this.state.seats[i]}/>
      )
    };
  }
}

//////////////////////////////////////////////// Seat

interface seatProps {
  value: string
}

function Seat(props: seatProps) {
  const seatStyle = {
    display: "inline-block",
    background: "#000000",
    opacity: "0.2",
    borderRadius: "50%",
    height: "36px",
    width: "36px",
    margin: "6px"
  };

  return (
    <div className="seat" style={seatStyle}>
      {props.value}
    </div>
  );
}