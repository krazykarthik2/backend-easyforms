const Form = require('../models/Form');
const Event = require('../models/Event');

// Create a new form
exports.createForm = async (req, res) => {
    try {
        const form = new Form(req.body);
        await form.save();
        // Associate the form with an event
        await Event.findByIdAndUpdate(req.body.event, { $push: { forms: form._id } });

        res.status(201).json(form);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all forms
exports.getAllForms = async (req, res) => {
    try {
        const forms = await Form.find(req.query || {}).populate('event',[ {event_description_long:0}]);
        res.json(forms);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single form by ID
exports.getFormById = async (req, res) => {
    try {
        const form = await Form.findById(req.params.id).populate('event');
        if (!form) return res.status(404).json({ message: 'Form not found' });
        res.json(form);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a form
exports.updateForm = async (req, res) => {
    try {
        const form = await Form.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!form) return res.status(404).json({ message: 'Form not found' });
        res.json(form);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a form
exports.deleteForm = async (req, res) => {
    try {
        const form = await Form.findByIdAndDelete(req.params.id);
        if (!form) return res.status(404).json({ message: 'Form not found' });
        res.json({ message: 'Form deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
