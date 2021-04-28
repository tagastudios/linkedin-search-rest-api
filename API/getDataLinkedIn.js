const mongoose = require("mongoose");
const Course = require("../models/courses");
const fetch = require("node-fetch");
require("dotenv").config({ path: "../.env" });

//Enviroment VAR
const {
  DB_CONNECTION,
  LINKEDIN_URL,
  LINKEDIN_URLFULL,
  LINKEDIN_TOKEN,
} = process.env;

// Update data to DB
const store = async (res, number, totalCourses) => {
  // Deconstruct
  const data = res.elements[0];
  // Define Schema and Data
  const db = await new Course({
    urn: data.urn,
    title: data.title.value,
    type: data.type,
    description: data.details.description.value,
    shortDescription: data.details.shortDescription.value,
    availability: data.details.availability,
    URL: data.details.urls.webLaunch,
    URLaicc: data.details.urls.aiccLaunch,
    classifications: data.details.classifications,
    cover: data.details.images.primary,
  });

  // Save data and show results
  await db
    .save()
    .then(() => {
      console.log("DATA SAVED! Course number " + number);

      // if (number == totalCourses - 1) {
      //   // Disconnect from DB
      //   mongoose.connection
      //     .close()
      //     .then(() => console.log("Disconnected from DB "));
      // }
    })
    .catch((err) => {
      console.log(err);
    });
};

// Fetch data from API
const fetchData = async (number, totalCourses) => {
  // Options Settings
  const options = {
    // method: "GET",
    headers: {
      Authorization: "Bearer " + LINKEDIN_TOKEN,
      "Content-Type": "application/json",
    },
  };

  // Ferching Data
  try {
    const resp = await fetch(`${LINKEDIN_URL}${number}`, options);
    const json = await resp.json();
    store(json, number, totalCourses);
    console.log("DATA PASSED");
  } catch (err) {
    console.log(err);
  }
};

// connect to mongodb
mongoose
  .connect(DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    // Success after saving data
    console.log("Connected to DB");

    // Search Total Number of Courses in API
    try {
      const resp = await fetch(LINKEDIN_URLFULL, {
        headers: {
          Authorization: "Bearer " + LINKEDIN_TOKEN,
          "Content-Type": "application/json",
        },
      });
      const json = await resp.json();
      const totalCourses = json.paging.total;
      console.log("NUMBER OF COURSES: " + totalCourses);

      // Cycle through all Courses
      for (let n = 0; n < totalCourses; n++) {
        fetchData(n, totalCourses);
      }
    } catch (err) {
      console.log(err);
    }
  })
  .catch((err) => console.log(err));
