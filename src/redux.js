const redux = require("redux");
const shortid = require("shortid");

// Actions
// -add projects
const addProject = (project) => ({
  type: "ADD_PROJECT",
  project,
});

const patchProject = (newProject, oldProject) => ({
  type: "PATCH_PROJECT",
  newProject,
  oldProject,
});

const deleteProject = (index, project) => ({
  type: "DELETE_PROJECT",
  index,
  project,
});

// Reducer
const reducer = (state = { projects: [], builds: [] }, action) => {
  switch (action.type) {
    //-add projects case
    case "ADD_PROJECT": {
      action.project.id = shortid();
      state.projects = [...state.projects, action.project];
      return state;
    }
    case "PATCH_PROJECT": {
      for (const key of Object.keys(action.newProject)) {
        if (action.oldProject.hasOwnProperty(key)) {
          action.oldProject[key] = action.newProject[key];
        }
      }
      return state;
    }
    case "DELETE_PROJECT": {
      if (action.index === 0) state.projects.splice(action.index, 1);
      else state.projects.splice(action.index, action.index);

      return state;
    }
  }
  return state;
};

// Store
const initialState = {
  projects: [],
};
const store = redux.createStore(reducer, initialState);

module.exports = { store, addProject, patchProject, deleteProject };
