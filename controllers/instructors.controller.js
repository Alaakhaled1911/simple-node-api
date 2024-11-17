let { instructors } = require("../data/data.js");
const { body, validationResult } = require("express-validator");
const getAllInstructors = (req, res) => {
  res.json(instructors);
};

const getInstructor = (req, res) => {
  const instructorId = +req.params.instructorId;

  // Find the instructor by ID
  const instructor = instructors.find(
    (instructor) => instructor.id === instructorId
  );

  if (!instructor) {
    return res.status(404).json({ message: "Instructor not found" });
  }

  res.json(instructor);
};
const addInstructor = (req, res) => {
  // Handle validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: "Validation errors occurred",
      errors: errors.array(),
    });
  }

  // Add the new instructor
  const newInstructor = { id: instructors.length + 1, ...req.body };
  instructors.push(newInstructor);

  // Return the updated list of instructors
  res.status(201).json({
    message: "Instructor has been added successfully",
    instructor: newInstructor,
  });
};
const editInstructor = (req, res) => {
  const instructorId = +req.params.instructorId;
  const instructor = instructors.find(
    (instructor) => instructor.id === instructorId
  );

  if (!instructor) {
    return res.status(404).json({ message: "Instructor not found" });
  }
  res.status(200).json({ ...instructor, ...req.body });
};
const deleteInstructor = (req, res) => {
  const instructorId = +req.params.instructorId;
  const instructor = instructors.filter(
    (instructor) => instructor.id !== instructorId
  );
  res.status(200).json({ message: "Instructor is deleted" });
};
module.exports = {
  getAllInstructors,
  getInstructor,
  addInstructor,
  editInstructor,
  deleteInstructor,
};
