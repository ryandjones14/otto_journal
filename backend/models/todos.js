const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TodoSchema = new Schema(
  {
    task: String,
    isComplete: Boolean
  },
  { timestamps: true }
);

module.exports = mongoose.model("Todo", TodoSchema);