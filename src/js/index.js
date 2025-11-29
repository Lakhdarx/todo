import "../styles/modern-normalize.css";
import "../styles/style.css";
import { renderProjects, renderTodos } from "./dom";
import { projectManager } from "./projectManager";
import { initUI } from "./ui";

function init() {
  initUI();
  renderProjects(projectManager.getProjects());
  const current = projectManager.getActiveProject();
  renderTodos(current.todos);
}

init();
