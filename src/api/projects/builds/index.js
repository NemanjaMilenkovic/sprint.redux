const router = require("express").Router({ mergeParams: true });

const { store } = require("../../../redux");

router.get("/", (req, res) => {
  // console.log("in--------->");
  const { projectId } = req.params;
  if (projectId !== "undefined") {
    const data = store.getState().projects;
    for (const project of data) {
      if (project.id === projectId) {
        if (project.builds !== undefined) {
          // console.log("project.builds :", project.builds);
          res.status(200).json({ builds: project.builds });
          return;
        }
        res
          .status(418)
          .json({ message: "project does not have builds" })
          .end();
      }
    }
  } else {
    res
      .status(418)
      .json({ message: "project not found" })
      .end();
  }
});

router.post("/", (req, res) => {
  const { projectId } = req.params;
  // TODO Trigger a new build for a project. Return immediately with status 200 (don't wait for build to finish).
  res.status(418).json({ message: "Not Implemented" });
});

router.get("/latest", (req, res) => {
  const { projectId } = req.params;
  // TODO Retrieve the latest build of a project
  res.status(418).json({ message: "Not Implemented" });
});

router.get("/:buildId", (req, res) => {
  const { projectId, buildId } = req.params;
  // TODO Retrieve a single build from a project
  res.status(418).json({ message: "Not Implemented" });
});

module.exports = router;
