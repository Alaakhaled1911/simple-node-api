const express = require("express");
const router = express.Router();
const userController = require("../controllers/usrers.controller");
const verifyToken = require("../middleware/verifyToken");
//get all users
router.route("/").get(verifyToken, userController.getAllUsers);
//register user
router.route("/register").post(userController.registerUsers);
//login user
router.route("/login").post(userController.loginUsers);
module.exports = router;
