const mongoose = require("mongoose");
const validator = require("validator");
const Schema = mongoose.Schema;
const usersSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [validator.isEmail, "please provide a valid email"],
  },
  password: {
    type: String,
    required: true,
  },
  token: {
    type: String,
  },
});
module.exports = mongoose.model("user", usersSchema);
