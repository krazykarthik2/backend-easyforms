const Form = require('../models/Form');
const Event = require('../models/Event');
const PopulateCreatedBySchema = {
    path: 'createdBy',
    select: 'name email' 
}
// Create a new form
exports.createForm = async (req, res) => {
    try {
    //     if(!req.user)return res.status(401).json({message:"Unauthorized"});
        const createdBy = req.user._id;
        const {formId,name,attributes,eventId} = req.body;
        const event = await Event.findById(req.body.eventId);
        // formId should be unique for all forms in an event
        const existingForm = await Form.findOne({formId,eventId});
        if(existingForm)return res.status(400).json({message:"Form ID already exists"});
        
        if(!event)return res.status(404).json({message:"Event not found"});

        const form = new Form({formId,name,attributes,createdBy,eventId});
        await form.save();
        event.forms.push(form._id);
        await event.save();

        res.status(201).json(form);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: error.message });
    }
};

// Get all forms
exports.getAllForms = async (req, res) => {
    try {
        const forms = await Form.find(req.query || {});
        res.status(200).json(forms);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single form by ID
exports.getFormById = async (req, res) => {
    try {
        console.log('getFormById',req.params.id);
        const form = await Form.findById(req.params.id).populate(PopulateCreatedBySchema);
        if (!form) return res.status(404).json({ message: 'Form not found' });
        res.status(200).json(form);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getFormSlugByEventSlug = async (req, res) => {
    try {
        const event = await Event.findOne({eventSlug:req.params.eventSlug});
        if(!event)return res.status(404).json({message:"Event not found"});
        const eventId = event._id;
        const form = await Form.findOne({formId:req.params.slug,eventId:eventId}).populate(PopulateCreatedBySchema);    
        if(!form)return res.status(404).json({message:"Form not found"});
        res.json(form);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getFormSlugByEventId = async (req, res) => {
    try {
        const form = await Form.findOne({formId:req.params.slug,eventId:req.params.eventId}).populate(PopulateCreatedBySchema);    
        if(!form)return res.status(404).json({message:"Form not found"});
        res.json(form);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a form
exports.updateForm = async (req, res) => {
    try {
        const form = await Form.findByIdAndUpdate(req.params.id, {...req.body,updatedAt:Date.now()}, { new: true });
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
        const event = await Event.findById(form.eventId);
        event.forms = event.forms.filter(formId=>formId.toString() !== form._id.toString());
        await event.save();
        if (!form) return res.status(404).json({ message: 'Form not found' });
        res.json({ message: 'Form deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
