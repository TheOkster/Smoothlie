const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  name: String,
  owner: String,
  // Currently assuming minute precision, can change later if needed
  duration: Number,
  label: String,
  category: String,
  notes: String,
  source: { type: String, enum: ["GCal", "Manual"] },
});

// compile model from schema
module.exports = mongoose.model("task", TaskSchema);
