// nodejs EventEmitter
import EventEmitter from "events";
import dispatcher from "../dispatcher";

class TodoStore extends EventEmitter {

	constructor() {
		super();

		this.todos = [
			{
				id: 123464613,
				text: "Go Shopping",
				complete: true
			},
			{
				id: 235684679,
				text: "Pay Water Bills",
				complete: false
			}
		];
	}

	getAll() {
		return this.todos;
	}

	handleActions(action) {
		switch(action.type) {
			case "CREATE_TODO":
				this.createTodo(action.text);
				break;
			case "DELETE_TODO":
				this.deleteTodo(action.id);
				break;
			case "COMPLETE_TODO":
				this.completeTodo(action.id);
				break;
			case "INCOMPLETE_TODO":
				this.incompleteTodo(action.id);
				break;
		}
	}

	createTodo(text) {
		const id = Date.now();

		this.todos.push({
			id,
			text,
			complete: false
		});

		this.emit("change");
	}

	deleteTodo(id) {
		this.todos = this.todos.filter( todo => todo.id !== id );
		this.emit("change");
	}

	completeTodo(id) {
		this.todos.map( todo => {
			if (todo.id === id) {
				todo.complete = true;
			} 
		});
		this.emit("change");
	}

	incompleteTodo(id) {
		this.todos.map( todo => {
			if (todo.id === id) {
				todo.complete = false;
			} 
		});
		this.emit("change");
	}
}

const todoStore = new TodoStore;
dispatcher.register(todoStore.handleActions.bind(todoStore));

export default todoStore;