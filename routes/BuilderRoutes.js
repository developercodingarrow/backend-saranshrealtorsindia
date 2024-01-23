const express = require("express");
const router = express.Router();
const builderController = require("../controllers/builderController");

// User Registration
router.post("/create-builder", builderController.createBuilder);
router.get("/all-builders", builderController.getAllBuilder);
router.delete("/delete-builder", builderController.deleteBuilder);

module.exports = router;
