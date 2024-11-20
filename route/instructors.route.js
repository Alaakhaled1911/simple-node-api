const express = require("express");
const router = express.Router();

const { body, validationResult } = require("express-validator");
const instructorController = require("../controllers/instructors.controller");
router.get("/", instructorController.getAllInstructors);
router.get("/:instructorId", instructorController.getInstructor);
router.post(
  "/",
  [
    // Validation rules
    // body("title")
    //   .notEmpty()
    //   .withMessage("Title is required")
    //   .isLength({ min: 3 })
    //   .withMessage("Title must be at least 3 characters long"),
    body("name").notEmpty().withMessage("Instructor name is required"),
    // body("duration")
    //   .notEmpty()
    //   .withMessage("Duration is required")
    //   .isLength({ min: 2 })
    //   .withMessage("Duration must be at least 2 characters long"),
  ],
  instructorController.addInstructor
);
//edit instructor
router.patch("/:instructorId", instructorController.editInstructor);
//delete instructor
router.delete("/:instructorId", instructorController.deleteInstructor);
module.exports = router;
