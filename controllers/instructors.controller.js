// let { instructors } = require("../data/data.js");
const { status } = require("init");
const Instructor = require("../Model/instructors.model");
const httpStatus = require("../utils/httpStatusText");

const { body, validationResult } = require("express-validator");
const asyncWrapper = require("../middleware/asyncWrapper");
const getAllInstructors = async (req, res) => {
  const query = req.query;
  const limit = query.limit;
  const page = query.page;
  const skip = (page - 1) * limit;

  const instructors = await Instructor.find({}, { __v: false })
    .limit(limit)
    .skip(skip);
  res.json({ status: httpStatus.SUCCESS, data: { instructors } });
};
const getInstructor = asyncWrapper(async (req, res) => {
  // Find the instructor by ID asynchronously
  const instructor = await Instructor.findById(req.params.instructorId);

  if (!instructor) {
    const error = new Error();
    error.message = "instructor not found";
    error.statusCode = 404;
    return next(error);

    // return res.status(404).json({
    //   status: httpStatus.FAIL,
    //   data: { instructor: "instructor not found" },
    // });
  }

  // Return the instructor's data as JSON
  res.json({ status: httpStatus.SUCCESS, data: { instructor } });
});

const addInstructor = async (req, res) => {
  // Handle validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: httpStatus.FAIL,
      data: errors.array(),
    });
  }

  // Add the new instructor
  const newInstructor = new Instructor(req.body);
  await newInstructor.save();

  // Return the updated list of instructors
  res.status(201).json({ status: httpStatus.SUCCESS, data: { newInstructor } });
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

    res.status(200).json({
      status: httpStatus.SUCCESS,
      data: { Instructor: updatedInstructor },
    });
  } catch (error) {
    res.status(500).json({
      status: httpStatus.ERROR,
      data: null,
      message: error.message,
    });
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
