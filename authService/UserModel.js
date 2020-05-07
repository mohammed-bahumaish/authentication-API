const mongoose = require("mongoose");
const { isEmail } = require("validator");
const jwt = require("jsonwebtoken");
const config = require("config");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [isEmail, "email is not valid"],
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.methods.generateToken = function () {
  const token = jwt.sign(
    { _id: this._id },
    process.env.jwtSecret || config.get("jwtSecret")
  );
  return token;
};
mongoose.model("User", userSchema);
