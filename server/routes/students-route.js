const express = require("express");
const router = express.Router();
const Student = require("../models/Student.model");

router.get("/", async (req, res) => {
  try {
    const students = await Student.find().populate("cohort");
    res.json(students);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res) => {
  try {
    const newStudent = await Student.create(req.body);
    res.status(201).json(newStudent);
  } catch (error) {
    next(error);
  }
});

router.get("/cohort/:cohortId", async (req, res) => {
  try {
    const studentsFromGivenCohort = await Student.find({
      cohort: `${req.params.cohortId}`,
    }).populate("cohort");
    res.json(studentsFromGivenCohort);
  } catch (error) {
    next(error);
  }
});

router.get("/:studentId", async (req, res) => {
  try {
    const oneStudent = await Student.findById(req.params.studentId).populate(
      "cohort"
    );
    res.json(oneStudent);
  } catch (error) {
    next(error);
  }
});

router.put("/:studentId", async (req, res) => {
  try {
    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.studentId,
      req.body,
      { new: true }
    ).populate("cohort");
    res.status(202).json(updatedStudent);
  } catch (error) {
    next(error);
  }
});

router.delete("/:studentId", async (req, res) => {
  try {
    const studentToDelete = await Student.findByIdAndDelete(
      req.params.studentId
    );
    res.status(202).json({
      message: `${studentToDelete.firstName} ${studentToDelete.lastName} was removed from the db`,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
