const mongoose = require("mongoose");

const HistorySchema = new mongoose.Schema({
  action: {
    type: String,
    required: true,
  },
  payload: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  user: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model("History", HistorySchema);
