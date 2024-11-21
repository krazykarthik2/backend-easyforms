const mongoose = require('mongoose');
require('../models/Event');
require('../models/Form');
require('../models/Response');
require('../models/EventImage');
const Event = mongoose.model('Event');
const Form = mongoose.model('Form');
const Response = mongoose.model('Response');
const EventImage = mongoose.model('EventImage');
// Create a new event
exports.createEvent = async (req, res) => {
    try {
        console.log(req.body);
        const event = new Event(req.body);
        await event.save();
        res.status(201).json(event);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: error.message });
    }
};

// Get all events
exports.getAllEvents = async (req, res) => {
    try {
        const events = await Event.find(req.query,{event_description_long:0});
        res.json(events);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

// Get a single event by ID
exports.getEventById = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id).populate('forms');
        if (!event) return res.status(404).json({ message: 'Event not found' });
        res.json(event);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};
exports.getEventBySlug = async (req, res) => {
    try {
        const event = await Event.findOne({eventSlug:req.params.slug});
        if (!event) return res.status(404).json({ message: 'Event not found' });
        res.json(event);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

// Update an event
exports.updateEvent = async (req, res) => {
    try {
        const event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!event) return res.status(404).json({ message: 'Event not found' });
        res.json(event);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: error.message });
    }
};

// Delete an event
exports.deleteEvent = async (req, res) => {
    try {
        const event = await Event.findByIdAndDelete(req.params.id);
        const forms = await Form.find({eventId:req.params.id});//forms of the event
        const responses = await Response.deleteMany({formId:{$in:forms.map(form => form._id)}});//responses of the forms
        await Promise.all(forms.map(form => form.deleteOne()));//delete all forms

        await EventImage.deleteMany({eventId:req.params.id});//delete all images of the event
        
        if (!event) return res.status(404).json({ message: 'Event not found' });
        res.json({ message: 'Event deleted' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};
 
