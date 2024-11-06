const mongoose = require('mongoose');

//  dateInput: Date,
// timeInput: String,
// fileInput: {
//     img: String,
//     video: String,
//     audio: String, 
// },
// stringInput: {
//     value: String,
//     regexFormat: String,
// },
// numberInput: Number,
// nameInput: String,
// paragraphInput: String,
// radioInput: [String],
// dropdownInput: [String],
// checkboxInput: [String],
// rating: Number,
// scale: {
//     min: Number,
//     max: Number,
// },
// helpLabel: String,

const attributesSchema = new mongoose.Schema({
    type: { type: String, required: true },
    required: { type: Boolean, required: true },
    label: { type: String, required: true },
    value: { type: String, required: true },
});

module.exports = mongoose.model('Attribute', attributesSchema);
