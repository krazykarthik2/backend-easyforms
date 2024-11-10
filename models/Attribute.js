const mongoose = require("mongoose");
const validator = require("validator"); 

const attributesSchema = new mongoose.Schema({
  required: { type: Boolean, required: true },
  label: { type: String, required: true, validate: (v) => v.length > 0 },
  questionType: { type: String, required: true },
  question: {
    dateInput: { type: Date, },
    timeInput: { type: String, },
    textInput: { type: String, },
    numberInput: { type: Number, },
    paragraphInput: { type: String, },
    radioInput: { type: [String], },
    dropdownInput: { type: [String], },
    checkboxInput: { type: [String], },
    rating: { type: { min: Number, max: Number }, },
    scale: { type: { min: Number, max: Number }, },
    emailInput: { type: String, validate: (v) => validator.isEmail(v) },
  },
});

module.exports = mongoose.model("Attribute", attributesSchema);
