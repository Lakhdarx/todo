export { projectManager };
import { Project } from "./project";

const projectManager = (function () {
  let projects = [];
  let defaultProject = new Project("Default Project");
  let activeProject = defaultProject;
  projects.push(defaultProject);

  function addProject(name) {
    const project = new Project(name);
    projects.push(project);
  }

  function getActiveProject() {
    return activeProject;
  }

  function getProjects() {
    return projects;
  }

  function deleteProject(id) {
    const index = projects.findIndex((project) => project.id === id);
    projects.splice(index, 1);
  }

  function setActiveProject(id) {
    activeProject = projects.find((project) => project.id === id);
  }

  return {
    addProject,
    deleteProject,
    getActiveProject,
    getProjects,
    setActiveProject,
  };
})();
