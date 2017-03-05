import React from "react";
import * as TodoActions from "../actions/TodoActions";

export default class Todo extends React.Component {
	constructor() {
		super();
	}

	toggleCompletionState = () => {
		if (this.props.complete) {
			TodoActions.incompleteTodo(this.props.id);
		} else {
			TodoActions.completeTodo(this.props.id);
		}
		
	}

	handleTodoDelete = () => {
		TodoActions.deleteTodo(this.props.id);
	}

	render() {

		const {complete, text} = this.props;
		const classes = [];

		if (complete) {
			classes.push("complete");
		}

		return (
			<li className={classes.join(" ")}>
				<span onClick={this.toggleCompletionState} >{text}</span>	
				<button onClick={this.handleTodoDelete}>Delete</button>
			</li>
		);
	}
}