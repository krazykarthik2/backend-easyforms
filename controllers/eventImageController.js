const EventImage = require("../models/EventImage");

exports.createEventImage = async (req, res) => {
    const { image } = req.body;
    const eventImage = await EventImage.create({ image, eventId: req.params.eventId });
    res.status(201).json(eventImage);
};
exports.createEventImagesBulk = async (req, res) => {
    const { images, isTransaction } = req.body;
    try{
        if(isTransaction){
            await EventImage.startTransaction();
            const eventImages = await EventImage.create(images.map((image)=>({image, eventId: req.params.eventId})));
            await EventImage.commitTransaction();
        }else{
            const eventImages = await EventImage.create(images.map((image)=>({image, eventId: req.params.eventId})));
        }
        res.status(201).json({message: "Event images created successfully!"});
    }catch(err){
        res.status(500).json({message: err.message});
    }
};
exports.getEventImageById = async (req, res) => {
    const eventImage = await EventImage.findById(req.params.imageId);
    res.status(200).json(eventImage);
};

exports.getEventImages = async (req, res) => {
    const eventImages = await EventImage.find({eventId: req.params.eventId});
    res.status(200).json(eventImages);
};

exports.deleteEventImage = async (req, res) => {
    const eventImage = await EventImage.findByIdAndDelete(req.params.imageId);
    res.status(200).json(eventImage);
};
