const express = require("express");
const router = express.Router();
const cityController = require("../controllers/cityController");

// User Registration
router.post("/create-city", cityController.createCity);
router.get("/all-cites", cityController.getAllCites);
router.delete("/delete-city", cityController.deleteCity);

module.exports = router;
