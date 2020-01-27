const redux = require("redux");

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

// Reducer
const reducer = (state = { projects: [], builds: [] }, action) => {
  switch (action.type) {
    //-add projects case
    case "ADD_PROJECT": {
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
  }
  return state;
};

// Store
const initialState = {
  projects: [
    {
      id: "hykjdLm",
      name: "vscode",
      url: "git@github.com:Microsoft/vscode.git",
      buildCommand: "yarn && yarn test",
      language: "JavaScript",
    },
    {
      id: "2",
      name: "nel",
      url: "git@github.com:Microsoft/vscode.git",
      buildCommand: "yarn && yarn test",
      language: "JavaScript",
    },
    {
      id: "asdf2",
      name: "chrome",
      url: "git@github.com:Microsoft/vscode.git",
      buildCommand: "yarn && yarn test",
      language: "JavaScript",
    },
    {
      id: "1",
      name: "travis",
      url: "git@github.com:Microsoft/vscode.git",
      buildCommand: "yarn && yarn test",
      language: "JavaScript",
    },
  ],
  builds: [
    {
      buildNumber: 65481,
      status: "Failed",
      output: "48 out of 13325 Tests failed.",
    },
    {
      buildNumber: 65482,
      status: "Failed",
      output: "48 out of 13325 Tests failed.",
    },
    {
      buildNumber: 65483,
      status: "Passed",
      output: "48 out of 13325 Tests Passed.",
    },
    {
      buildNumber: 65484,
      status: "Passed",
      output: "48 out of 13325 Tests Passed.",
    },
  ],
};
const store = redux.createStore(reducer, initialState);

module.exports = { store, addProject, patchProject };
