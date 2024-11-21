const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  rol: { type: String, enum: ["admin", "user"], default: "user" },
  password: { type: String, required: true },
  email: { type: String, required: true },
  verified: { type: Boolean, default: false },
  favorites: [{ type: mongoose.Types.ObjectId, ref: "recipes" }],
});

userSchema.pre("save", function () {
  this.password = bcrypt.hashSync(this.password, 10);
});

const User = mongoose.model("users", userSchema, "users");
module.exports = User;