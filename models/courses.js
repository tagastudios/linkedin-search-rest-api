const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const courseSchema = new Schema(
  {
    urn: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    shortDescription: {
      type: String,
      required: false,
    },
    availability: {
      type: String,
      required: true,
    },
    URL: {
      type: String,
      required: true,
    },
    URLaicc: {
      type: String,
      required: true,
    },
    classifications: {
      type: Array,
      required: false,
      default: [],
    },
    cover: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

const Course = mongoose.model("Course", courseSchema);
module.exports = Course;
