import { renderProjects, renderTodos } from "./dom";
import { projectManager } from "./projectManager";

export { initUI };

function setupAddTodoBtn() {
  const addBtn = document.querySelector("#add-todo");
  const modal = document.querySelector(".modal");
  const form = document.querySelector("#add-todo-form");
  const editingId = document.querySelector("#editing-id");

  addBtn.addEventListener("click", () => {
    modal.classList.add("show");
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.remove("show");
      editingId.value = "";
      form.reset();
    }
  });
}

function setupAddProjBtn() {
  const addProjBtn = document.querySelector("#add-project");
  addProjBtn.addEventListener("click", () => {
    const name = prompt("Enter new project name");
    if (!name) return;
    projectManager.addProject(name);
    renderProjects(projectManager.getProjects());
  });
}

function setupRemoveProjBtn() {
  const container = document.querySelector(".projects");
  container.addEventListener("click", (e) => {
    if (e.target.classList.contains("project-delete")) {
      const id = e.target.dataset.id;
      projectManager.deleteProject(id);
      renderProjects(projectManager.getProjects());
      renderTodos(projectManager.getActiveProject().todos);
    }
  });
}

function setupRemoveTodo() {
  const container = document.querySelector(".todos");
  container.addEventListener("click", (e) => {
    if (e.target.classList.contains("todo-delete")) {
      const id = e.target.dataset.id;
      const activeProject = projectManager.getActiveProject();
      activeProject.removeTodo(id);
      renderTodos(activeProject.todos);
    }
  });
}

function setupTodoForm() {
  const form = document.querySelector("#add-todo-form");
  const modal = document.querySelector(".modal");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const editingId = document.querySelector("#editing-id").value;

    const title = document.querySelector("#title").value;
    const description = document.querySelector("#description").value;
    const dueDate = document.querySelector("#due-date").value;
    const priority = document.querySelector("#priority").value;
    const notes = document.querySelector("#notes").value;

    const currentProj = projectManager.getActiveProject();

    if (editingId) {
      currentProj.removeTodo(editingId);
      document.querySelector("#editing-id").value = "";
    }

    currentProj.addTodo(title, description, dueDate, priority, notes);

    renderTodos(projectManager.getActiveProject().todos);
    modal.classList.remove("show");
    form.reset();
  });
}

function setupEditTodo() {
  const todos = document.querySelector(".todos");
  const form = document.querySelector("#add-todo-form");
  const modal = document.querySelector(".modal");

  todos.addEventListener("click", (e) => {
    const item = e.target.closest(".todo-item");
    if (
      e.target.matches("input[type='checkbox']") ||
      e.target.classList.contains("todo-delete") ||
      !item
    )
      return;

    const id = item.querySelector("input").dataset.id;
    const currentProj = projectManager.getActiveProject();

    modal.classList.add("show");

    // Fill up the form with current todo values.
    form.querySelector("#title").value = currentProj.todos.find(
      (t) => t.id === id
    ).title;

    form.querySelector("#description").value = currentProj.todos.find(
      (t) => t.id === id
    ).description;

    form.querySelector("#due-date").value = currentProj.todos.find(
      (t) => t.id === id
    ).dueDate;

    form.querySelector("#priority").value = currentProj.todos.find(
      (t) => t.id === id
    ).priority;

    form.querySelector("#notes").value = currentProj.todos.find(
      (t) => t.id === id
    ).notes;

    //

    document.querySelector("#editing-id").value = id;
  });
}

function switchProject() {
  document.querySelector(".projects").addEventListener("click", (e) => {
    const item = e.target.closest(".project-item");
    if (!item) return;

    if (e.target.classList.contains("project-delete")) return;

    const id =
      item.querySelector(".project-delete")?.dataset.id ||
      projectManager.getProjects()[0].id;

    projectManager.setActiveProject(id);

    renderTodos(projectManager.getActiveProject().todos);
  });
}

function setupCheckboxes() {
  const container = document.querySelector(".todos");
  container.addEventListener("change", (e) => {
    if (!e.target.matches("input[type='checkbox']")) return;

    const item = e.target.closest(".todo-item");
    const currentTodo = projectManager
      .getActiveProject()
      .todos.find((todo) => todo.id === e.target.dataset.id);

    if (e.target.checked) {
      item.classList.add("complete");
    } else {
      item.classList.remove("complete");
    }
    currentTodo.toggleCompleted();
  });
}

function initUI() {
  setupAddProjBtn();
  setupAddTodoBtn();
  setupTodoForm();
  setupRemoveProjBtn();
  setupRemoveTodo();
  switchProject();
  setupCheckboxes();
  setupEditTodo();
}
