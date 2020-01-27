const router = require("express").Router();
const builds = require("./builds");
const { store, addProject, patchProject } = require("../../redux");

router.get("/", (req, res) => {
  res.status(200).json(store.getState().projects);
});

router.post("/", (req, res) => {
  const project = req.body;
  const action = addProject(project);
  store.dispatch(action);
  res.status(201).end();
});

router.get("/:projectId", (req, res) => {
  const { projectId } = req.params;
  const data = store.getState().projects;
  for (let project of data) {
    if (project.id === projectId) {
      res.status(200).send(project);
      return;
    }
  }
  res
    .status(418)
    .json({ message: "project not found" })
    .end();
});

router.patch("/:projectId", (req, res) => {
  const { projectId } = req.params;
  const newProject = req.body;
  // TODO Make sure to validate whats being sent!
  const data = store.getState().projects;
  for (const oldProject of data) {
    if (oldProject.id === projectId) {
      const action = patchProject(newProject, oldProject);

      store.dispatch(action);
      res.status(201).end();
    }
  }
});

router.delete("/:projectId", (req, res) => {
  const { projectId } = req.params;
  // TODO delete project, return status 200 with no body on success
  res.status(418).json({ message: "Not Implemented" });
});

router.use("/:projectId/builds", builds);

module.exports = router;
