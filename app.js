const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
const courseRoutes = require("./routes/courseRoutes");
const apiRoutes = require("./routes/apiRoutes");
require("dotenv/config");

// express app
const app = express();
app.use(cors());

// connect to mongodb
mongoose
  .connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    // listen for requests
    app.listen(3000);
    console.log("Connected to DB");
  })
  .catch((err) => console.log(err));

// register view engine
app.set("view engine", "ejs");

// middleware & static files
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// Page Views Routing
app.get("/", (req, res) => {
  res.render("index", { title: "Home" });
});

// API Routes
app.use("/api", apiRoutes);

// Course Routes
app.use("/courses", courseRoutes);

// 404
app.use((req, res) => {
  res.status(404).render("404", { title: "404 - Page Not Found" });
});
