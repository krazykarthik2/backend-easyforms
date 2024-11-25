const mongoose = require("mongoose");
const attributesSchema = new mongoose.Schema({
  required: { type: Boolean, required: true },
  label: {
    type: String,
    required: true,
    trim: true,
  },
  question: {
    dateInput: { type: Date },
    timeInput: { type: String },
    textInput: { type: String },
    numberInput: { type: Number },
    paragraphInput: { type: String },
    radioInput: { type: [String] ,default:undefined},
    singleCheckboxInput:{ type:Boolean ,default:undefined},
    dropdownInput: { type: [String] ,default:undefined},
    checkboxInput: { type: [String] ,default:undefined},
    rating: { type:{min: Number, max: Number } ,default:undefined},
    scale: { type:{min: Number, max: Number } ,default:undefined},
    emailInput: { type: String },
  },
});
module.exports = {attributesSchema};