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
// REVISIT
function setupRemoveProjBtn() {
  const container = document.querySelector(".projects");
  container.addEventListener("click", (e) => {
    if (e.target.classList.contains("project-delete")) {
      const id = e.target.dataset.id; // CHECK WHEN DELETED PROJECT IS ACTIVE
      projectManager.deleteProject(id);
      renderProjects(projectManager.getProjects());
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
    if (e.target.classList.contains("project-item")) {
      const id = e.target.lastElementChild.dataset.id;
      projectManager.setActiveProject(id);

      const currentProj = projectManager.getActiveProject();
      document.querySelector("#current-project").textContent = currentProj.name;

      renderTodos(currentProj.todos);
    }
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
