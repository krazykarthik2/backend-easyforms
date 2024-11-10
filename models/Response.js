const mongoose = require('mongoose');
const { responseFieldSchema } = require('./ResponseField');
const responseSchema = new mongoose.Schema({
    formId: { type: mongoose.Schema.Types.ObjectId, ref: 'Form', required: true },
    eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
    answers: {
        type: [responseFieldSchema],
        required: true
    },
    submittedAt: { type: Date, default: Date.now },
    submittedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
    
});

module.exports = mongoose.model('Response', responseSchema);
