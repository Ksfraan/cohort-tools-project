const cors = require("cors");
const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const PORT = 5005;

// STATIC DATA
// Devs Team - Import the provided files with JSON data of students and cohorts here:
// ...
const cohorts = require("./cohorts.json");
const students = require("./students.json");
const Student = require("./models/Student.model");
const Cohort = require("./models/Cohort.model");
// INITIALIZE EXPRESS APP - https://expressjs.com/en/4x/api.html#express
const app = express();

// MIDDLEWARE
// Research Team - Set up CORS middleware here:
app.use(
  cors({
    // Add the URLs of allowed origins to this array
    origin: ["http://localhost:5005"],
  })
);
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// ROUTES - https://expressjs.com/en/starter/basic-routing.html
// Devs Team - Start working on the routes here:
app.listen(3000, () => console.log("App listening on port 5005!"));
const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/cohort-tools-api")
  .then((x) => console.log(`Connected to Database: "${x.connections[0].name}"`))
  .catch((err) => console.error("Error connecting to MongoDB", err));

// DOCS ROUTES
app.get("/docs", (req, res) => {
  res.sendFile(__dirname + "/views/docs.html");
});

// STUDENTS ROUTES
// Get all students
app.get("/api/students", async (request, response) => {
  const students = await Student.find().populate("cohort");

  response.json(students);
});

// Create one student
app.post("/api/students", async (request, response) => {
  console.log(request.body);
  const payload = request.body;
  try {
    const newStudent = await Student.create(payload);
    response.status(201).json(newStudent);
  } catch (error) {
    console.log(error);
    response
      .status(500)
      .json({ error, message: "Somethin happened maybe on the server" });
  }
});

// Get all of the students for a given cohort
app.get("/api/students/cohort/:cohortId", async (request, response) => {
  const { cohortId } = request.params;
  const studentsFromGivenCohort = await Student.find({
    cohort: `${cohortId}`,
  }).populate("cohort");

  response.json(studentsFromGivenCohort);
});

// Get a specific student by id
app.get("/api/students/:studentId", async (request, response) => {
  const { studentId } = request.params;

  const oneStudent = await Student.findById(studentId).populate("cohort");

  response.json(oneStudent);
});

// Update a specific student by id
app.put("/api/students/:studentId", async (request, response) => {
  console.log(request.body);
  const payload = request.body;
  try {
    const updatedStudent = await Student.findByIdAndUpdate(
      request.params.studentId,
      payload,
      { new: true }
    );
    response.status(202).json(updatedStudent);
  } catch (error) {
    console.log(error);
    response.status(500).json({ message: "Something bad happened" });
  }
});

// Delete a specific student by id
app.delete("/api/students/:studentId", async (request, response) => {
  const { studentId } = request.params;
  try {
    const studentToDelete = await Student.findByIdAndDelete(studentId);
    response.status(202).json({
      message: `${studentToDelete.firstName} ${studentToDelete.lastName}was removed from the db`,
    });
  } catch (error) {
    console.log(error);
    response.status(500).json({ message: "Something bad happened" });
  }
});

// COHORTS ROUTES
// Get all cohorts
app.get("/api/cohorts", async (request, response) => {
  const cohorts = await Cohort.find();
  response.json(cohorts);
});

// Create one cohort
app.post("/api/cohorts", async (request, response) => {
  console.log(request.body);
  const payload = request.body;
  try {
    const newCohort = await Cohort.create(payload);
    response.status(201).json(newCohort);
  } catch (error) {
    console.log(error);
    response
      .status(500)
      .json({ error, message: "Somethin happened maybe on the server" });
  }
});

// Get a specific cohort by ID
app.get("/api/cohorts/:cohortId", async (request, response) => {
  const { cohortId } = request.params;

  const oneCohort = await Cohort.findById(cohortId);

  response.json(oneCohort);
});

// Update a specific cohort by id
app.put("/api/cohorts/:cohortId", async (request, response) => {
  console.log(request.body);
  const payload = request.body;
  try {
    const updatedCohort = await Cohort.findByIdAndUpdate(
      request.params.cohortId,
      payload,
      { new: true }
    );
    response.status(202).json(updatedCohort);
  } catch (error) {
    console.log(error);
    response.status(500).json({ message: "Something bad happened" });
  }
});

// Delete a specific cohort by id
app.delete("/api/cohorts/:cohortId", async (request, response) => {
  const { cohortId } = request.params;
  try {
    const cohortToDelete = await Cohort.findByIdAndDelete(cohortId);
    response
      .status(202)
      .json({ message: `${cohortToDelete.cohortName} was remove from the db` });
  } catch (error) {
    console.log(error);
    response.status(500).json({ message: "Something bad happened" });
  }
});

// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
