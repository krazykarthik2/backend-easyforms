const mongoose = require('mongoose');

const formSchema = new mongoose.Schema({
    formId: { type: String, required: true, unique: true },
    event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
    dateInput: Date,
    timeInput: String,
    fileInput: {
        img: String,
        video: String,
        audio: String,
    },
    stringInput: {
        value: String,
        regexFormat: String,
    },
    numberInput: Number,
    nameInput: String,
    paragraphInput: String,
    radioInput: [String],
    dropdownInput: [String],
    checkboxInput: [String],
    rating: Number,
    scale: {
        min: Number,
        max: Number,
    },
    helpLabel: String,
});

module.exports = mongoose.model('Form', formSchema);
