import * as React from 'react';

interface MyProps {
 width: number;
 height: any;
 children: any;
 // any other props that come into the component
}
export const Sidebar = ({ width, height, children }: MyProps) => {

 return (
     <div className="side-bar" style={{width: width, minHeight: height }}>
       {children}
     </div>
 );
}

// interface squareProps {
//   handleClick: any
// }
// interface squareState {
//   occupants: number
// }

// class Square extends React.Component<squareProps, squareState> {
//   constructor(props: squareProps) {
//     super(props);
//     this.handleClick = this.handleClick.bind(this); //pass the click handler down from parent
//     this.state = {
//       occupants: 0
//     };
//   }

//   handleClick() {
//     //i csnt do this
//     console.log("square clicked")
//     alert('click');
//   }

//   render() {
//     const seatRow = {
//       margin: "10px"
//     };
//     const seatRowTop = {
//       margin: "10px",
//       paddingTop: "10px"
//     };

//     const tableStyle = {
//       background: "#fbc02d",
//       height: "180px",
//       width: "180px",
//       margin: "10px"
//     }

//     return (

//     )

//   }
// }
