const mongoose = require('mongoose');
const {attributesSchema} = require('./Attribute')
const formSchema = new mongoose.Schema({
    formId: { type: String, required: true, unique: true },
    eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
    name: { type: String, required: true },
    attributes: { type: [attributesSchema], required: true ,validate:{
        validator: (v) => v.length > 0,
        message: "Attributes are required and cannot be empty.",
    }},
    updatedAt: { type: Date, default: Date.now },
    createdAt: { type: Date, default: Date.now },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin', required: true },
});

module.exports = mongoose.model('Form', formSchema);
