const Course = require("../models/courses");

// GET INDEX AND REDIRECT
const api_index = (req, res) => {
  res.redirect("/api/courses");
};

// GET COURSES
const api_courses = (req, res) => {
  Course.find()
    // Sort new to old
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
};

// GET ALL UNIQUE SKILLS
const api_skills = (req, res) => {
  Course.find(
    { "classifications.associatedClassification.type": "SKILL" },
    "classifications.associatedClassification.type classifications.associatedClassification.name.value"
  )
    .then((result) => {
      // res.send(result);
      // Returning only unique Names by SKILLS only!
      let skills = [];
      try {
        result.forEach(async (data) => {
          for (let i = 0; i < result.length; i++) {
            if (data.classifications[i]) {
              const skill = await data.classifications[i]
                .associatedClassification.type;
              if (skill == "SKILL") {
                // JOIN
                const skillName =
                  data.classifications[i].associatedClassification.name.value;
                skills.push(skillName);
              }
            }
            if (i == result.length - 1) {
              let uniqueSkills = [...new Set(skills)];
              res.send(JSON.stringify(uniqueSkills));
            }
          }
        });
      } catch (err) {
        console.log(err);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

// GET COURSES AFTER GIVEN A SKILL
const api_skill_course = (req, res) => {
  const skill = req.params.id;
  Course.find({
    "classifications.associatedClassification.name.value": {
      $regex: skill,
      $options: "i",
    },
  })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.status(404).send("Skill not found -> " + skill);
    });
};

module.exports = {
  api_index,
  api_courses,
  api_skills,
  api_skill_course,
};
