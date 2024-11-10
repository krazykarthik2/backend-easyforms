const mongoose = require("mongoose");

const responseFieldSchema = new mongoose.Schema({
  dateInput: { type: Date },
  timeInput: { type: String },
  textInput: { type: String },
  numberInput: { type: Number },
  paragraphInput: { type: String },
  radioInput: { type: Number },
  dropdownInput: { type: Number },
  checkboxInput: { type: [Number], default:undefined }, // make sure if the question is not a checkbox, it should be an empty array
  rating: { type: Number },
  scale: { type: Number },
});
module.exports = { responseFieldSchema };
