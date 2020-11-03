import "callout.css";
import * as React from "react";
import { render } from "react-dom";

class App extends React.Component {
	state = {
		open: true
		};
	render() {
		return (
				<Callout
					profpic = "hi"
					name = "Joe Bruin"
					title = "ACM AI President"
					linkedin = "linkedin.com"
					email = "mailto:jbruin@ucla.edu"
        />
		);
	}
}

interface calloutProps {
	profpic: string,
	name: string,
	title: string,
	linkedin: string,
	email: string,
}

function Callout(props: calloutProps) {
  return (
		<div className="callout">
			<div className="callout-header"></div>
			<div className="profpic">{props.profpic}</div>
			<span className="closebtn">
				<i className="fas fa-times"></i>
			</span>
			<div className="callout-container">
				<div className="name">{props.name}</div>
				<div className="title">{props.title}</div>
        <div className="socials1"><i className="fab fa-linkedin"></i></div>
        <div className="socials2"><i className="fas fa-envelope-open-text"></i></div>
			</div>
    </div>
  );
}

//todo: make the close button functional, debug hover on socials

render(<App />, document.getElementById("root"));
