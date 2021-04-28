const express = require("express");
const router = express.Router();
const courseController = require("../controllers/courseController");

// COURSES DATA ROUTES

// GET Seach Params or ALL DATA
router.get("/", courseController.course_search);

// GET AND CREATE
router.get("/create", courseController.course_create);

// GET DETAIL
router.get("/:id", courseController.course_details);

// POST
router.post("/", courseController.course_post);

// DELETE COURSE
router.delete("/:id", courseController.course_delete);

// 404
router.use((req, res) => {
  res.status(404).render("404", { title: "404 - API Course not found" });
});

module.exports = router;
