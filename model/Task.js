const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
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

module.exports = mongoose.model("Task", TaskSchema);
