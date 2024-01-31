const mongoose = require("mongoose");

/* Got help from a piazza post for the eventschema */
const EventSchema = new mongoose.Schema({
  title: String,
  start: Date,
  end: Date,
  description: String,
  label: String,
  fruit: String,
  urgent: Boolean,
  important: Boolean,
});

const SmoothieSchema = new mongoose.Schema({
  name: String,
  owner: String,
  events: [EventSchema],
});
// compile model from schema
module.exports = mongoose.model("smoothie", SmoothieSchema);
