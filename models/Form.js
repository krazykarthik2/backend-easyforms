const mongoose = require('mongoose');
require('./Attribute')
const {attributesSchema} = mongoose.model('Attribute')
const formSchema = new mongoose.Schema({
    formId: { type: String, required: true, unique: true },
    eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
    name: { type: String, required: true },
    attributes: { type: [attributesSchema] },
    // attributes: { type: [attributesSchema], required: true },
    updatedAt: { type: Date, default: Date.now },
    createdAt: { type: Date, default: Date.now },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin', required: true },
});

module.exports = mongoose.model('Form', formSchema);
