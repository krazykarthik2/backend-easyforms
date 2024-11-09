const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    name: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    forms: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Form' }],
    event_description_long: { type: String, required: false },
});

module.exports = mongoose.model('Event', eventSchema);
