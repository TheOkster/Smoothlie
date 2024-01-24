const mongoose = require("mongoose");

const SmoothieSchema = new mongoose.Schema({
  name: String,
  owner: String,
  startTimestamp: Number,
  endTimestamp: Number,
  events: [
    {
      startTimestamp: Number,
      endTimestamp: Number,
    },
  ],
});

// compile model from schema
module.exports = mongoose.model("smoothie", SmoothieSchema);
