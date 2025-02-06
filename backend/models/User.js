const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  firstname:  { type: String },
  lastname: { type: String },
  password: { type: String, required: true },
  createon: { type: Date, default: Date.now },
});

module.exports = mongoose.model("User", UserSchema);
