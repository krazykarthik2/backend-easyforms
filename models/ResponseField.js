const mongoose = require("mongoose");
const validator = require("validator")
const responseFieldSchema = new mongoose.Schema({
  dateInput: { type: Date },
  timeInput: { type: String },
  textInput: { type: String ,trim:true, },
  emailInput:{type:String, validate:e=>validator.isEmail(e)},
  numberInput: { type: Number },
  paragraphInput: { type: String ,trim:true, validate:e=>e.trim()!="" },
  radioInput: { type: Number },
  singleCheckboxInput:{type:Boolean},
  dropdownInput: { type: Number },
  checkboxInput: { type: [Number], default:undefined }, // make sure if the question is not a checkbox, it should be an empty array
  rating: { type: Number },
  scale: { type: Number },
});
module.exports = { responseFieldSchema };
