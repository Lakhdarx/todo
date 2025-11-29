import { Todo } from "./todo";

export { Project };

class Project {
  constructor(name) {
    this.id = crypto.randomUUID();
    this.name = name;
    this.todos = [];
  }
  addTodo(title, description, dueDate, priority, notes) {
    const toDo = new Todo(title, description, dueDate, priority, notes);
    this.todos.push(toDo);
  }
  removeTodo(id) {
    const index = this.todos.findIndex((todo) => todo.id === id);
    this.todos.splice(index, 1);
  }
}
