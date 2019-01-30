const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = new Schema(
  {
    id: Number,
    task: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", TaskSchema);