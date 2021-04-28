const Course = require("../models/courses");

// SEARCH PARAMETERS OR ALL COURSES
const course_search = (req, res) => {
  const param = req.query.search;

  // IF IT'S A SEARCH
  if (param !== undefined || param !== "") {
    Course.find({
      "classifications.associatedClassification.name.value": {
        $regex: param,
        $options: "i",
      },
    })
      .limit(100)
      .then((result) => {
        res.render("courses", { title: "Courses", courses: result });
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    // IF IT'S NOT A SEARCH - RETURN ALL DATA
    Course.find()
      .sort({ createdAt: -1 }) // Sort new to old
      .limit(100)
      .then((result) => {
        res.render("courses", { title: "Courses", courses: result });
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

// GET DETAILS
const course_details = (req, res) => {
  const id = req.params.id;
  Course.findById(id)
    .then((result) => {
      res.render("courses-detail", { course: result, title: "Course Details" });
    })
    .catch((err) => {
      res.status(404).render("404", { title: "404 - Course not found" });
    });
};

// GET AND CREATE
const course_create = (req, res) => {
  res.render("courses-create.ejs", { title: "New Course" });
};

// POST
const course_post = (req, res) => {
  const course = new Course(req.body);
  course
    .save()
    .then(() => {
      res.redirect("/courses");
    })
    .catch((err) => console.log(err));
};

// DELETE
const course_delete = (req, res) => {
  const id = req.params.id;
  Course.findByIdAndDelete(id)
    .then(() => {
      res.json({ redirect: "/courses" });
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = {
  course_search,
  course_details,
  course_create,
  course_post,
  course_delete,
};
