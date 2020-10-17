const mongoose = require("mongoose");

// Todo Schema
const todoSchema = new mongoose.Schema(
  {
    text: { type: String, required: true },
    date: { type: Date, default: Date.now() },
    checked: { type: Boolean, default: false },
  },
  { timestamps: true }
);
module.exports = TodoModel = mongoose.model("todo", todoSchema);
