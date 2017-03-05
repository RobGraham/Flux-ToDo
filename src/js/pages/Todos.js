import React from "react";
import Todo from "../components/Todo";
import TodoStore from "../stores/TodoStore";
import * as TodoActions from "../actions/TodoActions";

export default class Todos extends React.Component {
	constructor() {
		super();

		this.addTodoInput = null;
		this.state = {
			todos: TodoStore.getAll()
		}
	}

	componentWillMount() {
		TodoStore.on("change", this.getTodos)
	}

	componentWillUnmount() {
		TodoStore.removeListener("change", this.getTodos);
	}

	getTodos = () => {
		this.setState({
			todos: TodoStore.getAll()
		})
	}

	handleCreateTodo = () => {
		if (this.addTodoInput && this.addTodoInput.value) {
			TodoActions.createTodo(this.addTodoInput.value);
			this.addTodoInput.value = "";
		}
	}

	handleKeyPress = e => {
		if (e.key === 'Enter') {
			this.handleCreateTodo();
		}
	}

	render() {
		const { todos } = this.state;
		const TodoComponents = todos.map( todo => <Todo key={todo.id} {...todo} /> );

		return (
			<div>
				<h1>Todos</h1>
				<input type="text" ref={input => this.addTodoInput = input} onKeyPress={this.handleKeyPress} />
				<button onClick={this.handleCreateTodo}>Add</button>
				<ul>{TodoComponents}</ul>
			</div>
		);
	}
}