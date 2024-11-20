// let { instructors } = require("../data/data.js");
const Instructor = require("../Model/instructors.model");

const { body, validationResult } = require("express-validator");
const getAllInstructors = async (req, res) => {
  const instructors = await Instructor.find();
  res.json(instructors);
};

const getInstructor = async (req, res) => {
  try {
    // Find the instructor by ID asynchronously
    const instructor = await Instructor.findById(req.params.instructorId);

    if (!instructor) {
      return res.status(404).json({ message: "Instructor not found" });
    }

    // Return the instructor's data as JSON
    res.json(instructor);
  } catch (error) {
    // Handle any unexpected errors
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while retrieving the instructor" });
  }
};

const addInstructor = async (req, res) => {
  // Handle validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: "Validation errors occurred",
      errors: errors.array(),
    });
  }

  // Add the new instructor
  const newInstructor = new Instructor(req.body);
  await newInstructor.save();

  // Return the updated list of instructors
  res.status(201).json({
    message: "Instructor has been added successfully",
    instructor: newInstructor,
  });
};
const editInstructor = async (req, res) => {
  const instructorId = req.params.instructorId;

  try {
    const updatedInstructor = await Instructor.findOneAndUpdate(
      { _id: instructorId },
      { $set: { ...req.body } },
      { new: true }
    );

    if (!updatedInstructor) {
      return res.status(404).json({ message: "Instructor not found" });
    }

    res.status(200).json(updatedInstructor);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while updating the instructor" });
  }
};

const deleteInstructor = async (req, res) => {
  const instructorId = req.params.instructorId;
  await Instructor.deleteOne({ _id: instructorId });

  res.status(200).json({ message: "Instructor is deleted" });
};
module.exports = {
  getAllInstructors,
  getInstructor,
  addInstructor,
  editInstructor,
  deleteInstructor,
};
