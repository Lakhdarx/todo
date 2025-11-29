import { format } from "date-fns";
import { projectManager } from "./projectManager";
export { renderProjects, renderTodos };

function renderTodos(todos) {
  document.querySelector("#current-project").textContent =
    projectManager.getActiveProject().name;

  const container = document.querySelector(".todos");
  container.textContent = "";

  todos.forEach((element) => {
    const todoContainer = document.createElement("div");
    todoContainer.classList.add("todo-item");

    const checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");
    checkbox.setAttribute("data-id", element.id);

    const title = document.createElement("span");
    title.classList.add("todo-title");
    title.textContent = element.title;

    const dueDate = document.createElement("span");
    dueDate.classList.add("due-date");
    dueDate.textContent = format(
      new Date(element.dueDate),
      "EEEE | dd MMM, yyyy"
    ); // Friday | 25 Nov, 2024

    const deleteTodo = document.createElement("button");
    deleteTodo.classList.add("todo-delete");
    deleteTodo.textContent = "X";
    deleteTodo.setAttribute("data-id", element.id);

    todoContainer.appendChild(checkbox);
    todoContainer.appendChild(title);
    todoContainer.appendChild(dueDate);
    todoContainer.appendChild(deleteTodo);

    switch (element.priority) {
      case "low":
        todoContainer.classList.add("low");
        break;
      case "medium":
        todoContainer.classList.add("medium");
        break;
      case "high":
        todoContainer.classList.add("high");
    }

    container.appendChild(todoContainer);
  });
}

function renderProjects(projects) {
  const container = document.querySelector(".projects");
  container.textContent = "";

  projects.forEach((project) => {
    const item = document.createElement("div");
    item.classList.add("project-item");

    const name = document.createElement("span");
    name.classList.add("project-name");
    name.textContent = project.name;

    item.appendChild(name);

    if (project.name !== "Default Project") {
      const btn = document.createElement("button");
      btn.classList.add("project-delete");
      btn.setAttribute("data-id", project.id);
      btn.textContent = "X";
      item.appendChild(btn);
    }

    container.appendChild(item);
  });
}
