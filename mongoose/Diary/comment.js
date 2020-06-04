const mongoose = require("mongoose");

const { Schema } = mongoose;
const commentSchema = new Schema({
  useredName: {
    type: String,
    required: true,
  },
  id: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  descreption: {
    type: String,
  },
});

module.exports = mongoose.model("Comment", commentSchema);
