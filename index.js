require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const httpStatus = require("./utils/httpStatusText");
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected successfully ");
  })
  .catch((error) => {
    console.log("error with connecting with DB", error);
  });
// const cors = require("cors");
// app.use(cors());

app.use(express.json());

const instructorRouter = require("./route/instructors.route");
const userRouter = require("./route/userRouter.route");
app.use("/api/instructors", instructorRouter);
app.use("/api/users", userRouter);
app.all("*", (req, res, next) => {
  res.status(404).json({
    status: httpStatus.ERROR,
    data: null,
    message: "This resource is not available",
  });
});

app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).json({
    status: err.statusText || "error",
    data: null,
    message: err.message || "An unexpected error occurred",
  });
});

app.listen(process.env.port, () => {
  console.log("iam listening on port 5000");
});
