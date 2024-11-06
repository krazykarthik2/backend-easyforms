const mongoose = require('mongoose');
require('./Attribute')
const {attributesSchema} = mongoose.model('Attribute')
const formSchema = new mongoose.Schema({
    formId: { type: String, required: true, unique: true },
    event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
    attributes: { type: [attributesSchema], required: true },
});

module.exports = mongoose.model('Form', formSchema);
