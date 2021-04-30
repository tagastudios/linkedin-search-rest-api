const Course = require("../models/courses");

// GET INDEX AND REDIRECT
const api_index = (req, res) => {
  // res.redirect("/api/skills");
  res.status(404).json({ error: "404 - API Route not found" });
};

// GET COURSES
const api_courses = (req, res) => {
  req.setTimeout(30000);
  Course.find()
    // Sort new to old
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log("Error Courses - 1");
    });
};

// GET ALL UNIQUE SKILLS
const api_skills = (req, res) => {
  req.setTimeout(30000);
  Course.find(
    { "classifications.associatedClassification.type": "SKILL" },
    "classifications.associatedClassification.type classifications.associatedClassification.name.value"
  )
    .then(async (result) => {
      // res.send(result);
      // Returning only unique Names by SKILLS only!
      let skills = [];

      await result.forEach((data) => {
        for (let i = 0; i < data.classifications.length; i++) {
          if (data.classifications[i]) {
            const skill = data.classifications[i].associatedClassification.type;
            if (skill == "SKILL") {
              // JOIN
              const skillName =
                data.classifications[i].associatedClassification.name.value;
              skills.push(skillName);
            }
          } else {
            console.log("test");
            next(err);
          }
          if (i == data.classifications.length - 1) {
            // let uniqueSkills = [...new Set(skills)];
            // res.json(uniqueSkills);
            // res.status(200).json({ uniqueSkills });
          }
        }
      });

      let uniqueSkills = [...new Set(skills)].sort();
      res.json(uniqueSkills);
    })
    .catch((err) => {
      console.log("Error Skills - 2");
      res.json({ err });
    });
};

// GET COURSES AFTER GIVEN A SKILL
const api_skill_course = (req, res, next) => {
  req.setTimeout(30000);
  const skill = req.params.id;
  Course.find({
    "classifications.associatedClassification.name.value": {
      $regex: skill,
      $options: "i",
    },
  })
    .then((result) => {
      if (result == "") {
        next(err);
      }
      res.json(result);
    })
    .catch((err) => {
      res.status(404).json({ error: "No data find by " + skill });
      console.log("Error Courses by Skill - 1");
    });
};

module.exports = {
  api_index,
  api_courses,
  api_skills,
  api_skill_course,
};
