import * as React from 'react';

export function MapPage(props: React.PropsWithChildren<JSX.IntrinsicElements['div']>) {
  return (
    <Room />
  )
}

//////////////////////////////////////////////// Room

export class Room extends React.Component {
  render() {
    return (
      <div className="room">
        <div className="square-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
        </div>
        <div className="square-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
        </div>
        <div className="square-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
        </div>
      </div>
    );
  }

  renderSquare(i: number) {
    return (
      <div className="square-group">
      <Square handleClick/>
      <label>Table {i+1}</label>
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
    return (
      <div className="square" onClick={this.handleClick}>
        <div className="square-row">
          {this.renderSeat(0)}
          {this.renderSeat(1)}
          {this.renderSeat(2)}
        </div>
        <div className="square-row">
          {this.renderSeat(3)}
          {this.renderSeat(8)}
          {this.renderSeat(4)}
        </div>
        <div className="square-row">
          {this.renderSeat(5)}
          {this.renderSeat(6)}
          {this.renderSeat(7)}
        </div>
      </div>
    );
  }

  renderSeat(i: number) {
    if (i == 8){
      return (
        <div className="empty">
        </div>
      )
    } else {
      return (
        <Seat
          value={this.state.seats[i]}
        />
      )
    };
  }
}

//////////////////////////////////////////////// Seat

interface seatProps {
  value: string
}

function Seat(props: seatProps) {
  return (
    <div className="seat">
      {props.value}
    </div>
  );
}

