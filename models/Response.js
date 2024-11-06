const mongoose = require('mongoose');

const responseSchema = new mongoose.Schema({
    form: { type: mongoose.Schema.Types.ObjectId, ref: 'Form', required: true },
    event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
    answers: {
        type: [Map],
        of: mongoose.Schema.Types.Mixed, // Allows different data types in responses
    },
    submittedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Response', responseSchema);
