const express = require("express");
const app = express();
let { instructors, courses } = require("./data/data.js");
app.use(express.json());
const { body, validationResult } = require("express-validator");
app.get("/api/instructors", (req, res) => {
  res.json(instructors);
});
app.get("/api/instructors/:instructorId", (req, res) => {
  const instructorId = +req.params.instructorId;

  // Find the instructor by ID
  const instructor = instructors.find(
    (instructor) => instructor.id === instructorId
  );

  if (!instructor) {
    return res.status(404).json({ message: "Instructor not found" });
  }

  res.json(instructor);
});

app.post(
  "/api/instructors",
  [
    // Validation rules
    body("title")
      .notEmpty()
      .withMessage("Title is required")
      .isLength({ min: 3 })
      .withMessage("Title must be at least 3 characters long"),
    body("instructor").notEmpty().withMessage("Instructor name is required"),
    body("duration")
      .notEmpty()
      .withMessage("Duration is required")
      .isLength({ min: 2 })
      .withMessage("Duration must be at least 2 characters long"),
  ],
  (req, res) => {
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
  }
);
//edit instructor
app.patch("/api/instructors/:instructorId", (req, res) => {
  const instructorId = +req.params.instructorId;
  const instructor = instructors.find(
    (instructor) => instructor.id === instructorId
  );

  if (!instructor) {
    return res.status(404).json({ message: "Instructor not found" });
  }
  res.status(200).json({ ...instructor, ...req.body });
});
//delete instructor
app.delete("/api/instructors/:instructorId", (req, res) => {
  const instructorId = +req.params.instructorId;
  const instructor = instructors.filter(
    (instructor) => instructor.id !== instructorId
  );
  res.status(200).json({ message: "Instructor is deleted" });
});
app.listen(5000, () => {
  console.log("iam listening on port 5000");
});
