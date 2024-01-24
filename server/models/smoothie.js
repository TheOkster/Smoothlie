const mongoose = require("mongoose");

const SmoothieSchema = new mongoose.Schema({
  name: String,
  owner: String,
  /* Each timestamp represents the time it includes and 15 minutes ahead
     May change to maek it easier to understand */
  timestamps: [],
  events: [
    {
      startTimestamp: Number,
      endTimestamp: Number,
    },
  ],
});
// compile model from schema
module.exports = mongoose.model("smoothie", SmoothieSchema);
