const router = require("express").Router();
const builds = require("./builds");
const { store, addProject } = require("../../redux");

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
  const { project } = req.body;
  // TODO edit a projects information. Make sure to validate whats being sent!
  res.status(418).json({ message: "Not Implemented" });
});

router.delete("/:projectId", (req, res) => {
  const { projectId } = req.params;
  // TODO delete project, return status 200 with no body on success
  res.status(418).json({ message: "Not Implemented" });
});

router.use("/:projectId/builds", builds);

module.exports = router;
