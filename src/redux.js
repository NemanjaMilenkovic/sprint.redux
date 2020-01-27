const redux = require("redux");

// Actions
// -add projects
const addProject = (project) => ({
  type: "ADD_PROJECT",
  project,
});

// Reducer
const reducer = (state = { projects: [], builds: [] }, action) => {
  switch (action.type) {
    //-add projects case
    case "ADD_PROJECT": {
      state.projects = [...state.projects, action.project];
      return state;
    }
  }
  return state;
};

// Store
const initialState = {
  projects: [],
  builds: [],
};
const store = redux.createStore(reducer, initialState);

module.exports = { store, addProject };
