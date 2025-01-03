const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  firstname: String,
  email: String,
  password: String,
  token: String,
  avatar: String,
  likedEvents: [{ type: mongoose.Schema.Types.ObjectId, ref: "events" }],
});

const User = mongoose.model("users", userSchema);

module.exports = User;
