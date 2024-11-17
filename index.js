const express = require("express");
const app = express();
app.use(express.json());
const instructorRouter = require("./route/instructors.route");
app.use("/api/instructors", instructorRouter);
app.listen(5000, () => {
  console.log("iam listening on port 5000");
});
