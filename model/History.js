const mongoose = require("mongoose");

const HistorySchema = new mongoose.Schema({
  action: {
    type: String,
    required: true,
  },
  payload: {
    type: Array,
    required: true,
  },
  type: {
    type: String,
    required: false,
  },
  user: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("History", HistorySchema);
