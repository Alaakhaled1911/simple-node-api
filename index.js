const express = require("express");
const app = express();
const mongoose = require("mongoose");
mongoose
  .connect(
    "mongodb+srv://alaak19620:alaakhaled1911*@e-learning-cluster.8jb7q.mongodb.net/?retryWrites=true&w=majority&appName=E-Learning-cluster"
  )
  .then(() => {
    console.log("Connected successfully ");
  })
  .catch((error) => {
    console.log("error with connecting with DB", error);
  });

app.use(express.json());
const instructorRouter = require("./route/instructors.route");
app.use("/api/instructors", instructorRouter);
app.listen(5000, () => {
  console.log("iam listening on port 5000");
});
