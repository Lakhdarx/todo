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
    const project = projects.find((project) => project.id === id);
    if (!project || project.name === "Default Project") return;
    const index = projects.indexOf(project);

    if (project === getActiveProject()) setActiveProject(defaultProject.id);
    projects.splice(index, 1);
  }

  function setActiveProject(id) {
    const proj = projects.find((p) => p.id === id);
    if (proj) activeProject = proj;
  }

  function deleteAllProjects() {
    projects.length = 0;
  }

  return {
    addProject,
    deleteProject,
    getActiveProject,
    getProjects,
    setActiveProject,
    deleteAllProjects,
  };
})();
