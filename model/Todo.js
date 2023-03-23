const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
  task: {
    type: String,
    required: true,
  },
  AsignedUser: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: false,
  },
  isDone: {
    type: Boolean,
    required: false,
    default: false,
  },
});

module.exports = mongoose.model("Todo", TodoSchema);
