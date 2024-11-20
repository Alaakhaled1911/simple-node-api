const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const instructorsSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("instructor", instructorsSchema);
