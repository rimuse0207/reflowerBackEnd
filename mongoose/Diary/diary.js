const mongoose = require("mongoose");

const { Schema } = mongoose;
const diarySchema = new Schema({
  useredName: {
    type: String,
    required: true,
  },
  imageFile: {
    type: Array,
  },
  date: {
    type: Date,
  },
  flowerName: {
    type: String,
  },
  title: {
    type: String,
  },
  descreption: {
    type: String,
  },
});

module.exports = mongoose.model("Diary", diarySchema);
