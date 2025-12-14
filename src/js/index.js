import "../styles/modern-normalize.css";
import "../styles/style.css";
import { renderProjects, renderTodos } from "./dom";
import { projectManager } from "./projectManager";
import { loadStorage } from "./storage";
import { initUI } from "./ui";

function init() {
  initUI();
  loadStorage();
  renderProjects(projectManager.getProjects());
  const current = projectManager.getActiveProject();
  renderTodos(current.todos);
}

init();
