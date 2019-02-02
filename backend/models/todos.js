const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TodoSchema = new Schema(
  {
    id: Number,
    task: String,
    isComplete: Boolean
  },
  { timestamps: true }
);

module.exports = mongoose.model("Todo", TodoSchema);