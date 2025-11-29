import { renderProjects, renderTodos } from "./dom";
import { projectManager } from "./projectManager";

export { initUI };

function setupAddTodoBtn() {
  const addBtn = document.querySelector("#add-todo");
  const modal = document.querySelector(".modal");

  addBtn.addEventListener("click", () => {
    modal.classList.add("show");
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.remove("show");
    }
  });
}

function setupAddProjBtn() {
  const addProjBtn = document.querySelector("#add-project");
  addProjBtn.addEventListener("click", () => {
    const name = prompt("Enter new project name");
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

    const title = document.querySelector("#title").value;
    const description = document.querySelector("#description").value;
    const dueDate = document.querySelector("#due-date").value;
    const priority = document.querySelector("#priority").value;
    const notes = document.querySelector("#notes").value;

    projectManager
      .getActiveProject()
      .addTodo(title, description, dueDate, priority, notes);

    renderTodos(projectManager.getActiveProject().todos);
    modal.classList.remove("show");
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

function initUI() {
  setupAddProjBtn();
  setupAddTodoBtn();
  setupTodoForm();
  setupRemoveProjBtn();
  setupRemoveTodo();
  switchProject();
}
