const express = require("express");
const router = express.Router();
const apiController = require("../controllers/apiController");

// API ROUTES

// GET ALL
router.get("/", apiController.api_index);

// GET ALL COURSES INFO
router.get("/courses", apiController.api_courses);

// GET (TASK A): LIST OF UNIQUE CLASSIFICATION
router.get("/skills", apiController.api_skills);

// GET (TASK B): RETURN COURSE GIVEN A SKILL
router.get("/skill/:id", apiController.api_skill_course);

// 404
router.use((req, res) => {
  res.status(404).send("404 - API Route not found");
});

module.exports = router;
