const express = require("express");
const router = express.Router();
const projectController = require("../controllers/projectController");
const { thumblinMidelwear } = require("../utils/multerUploadMiddleware");

// CREATE PROJECT ROUTE
router.post("/create-project", projectController.createProject);
router.get("/get-all-projects", projectController.getAllProjets);
router.delete("/delete-project", projectController.deleteProject);
router.get("/get-single-project/:slug", projectController.getProject);
router.patch(
  "/update-project-thumblin/:slug",
  thumblinMidelwear,
  projectController.uploadThumblin
);

module.exports = router;
