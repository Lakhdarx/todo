import { projectManager } from "./projectManager";
export { saveToStorage, loadStorage };

function saveToStorage() {
  const data = projectManager.getProjects().map(function (project) {
    return {
      id: project.id,
      name: project.name,
      todos: project.todos.map(function (todo) {
        return {
          id: todo.id,
          title: todo.title,
          description: todo.description,
          dueDate: todo.dueDate,
          priority: todo.priority,
          notes: todo.notes,
          completed: todo.completed,
        };
      }),
    };
  });
  localStorage.setItem("projects", JSON.stringify(data));
  localStorage.setItem("activeProjectID", projectManager.getActiveProject().id);
}

function loadStorage() {
  const data = localStorage.getItem("projects");
  if (!data) return; // If no saved data, load none.

  const parsedProjects = JSON.parse(data);
  //  reset all projects
  projectManager.deleteAllProjects();

  parsedProjects.forEach((parsedProj) => {
    projectManager.addProject(parsedProj.name);
    const project =
      projectManager.getProjects()[projectManager.getProjects().length - 1];

    project.id = parsedProj.id;

    parsedProj.todos.forEach((parsedTodo) => {
      project.addTodo(
        parsedTodo.title,
        parsedTodo.description,
        parsedTodo.dueDate,
        parsedTodo.priority,
        parsedTodo.notes
      );

      //   set id of the todo to match the parsed todo
      project.todos[project.todos.length - 1].completed = parsedTodo.completed;
      project.todos[project.todos.length - 1].id = parsedTodo.id;
    });
  });

  //   handling active project

  const activeId = localStorage.getItem("activeProjectID");
  projectManager.setActiveProject(activeId);
}
