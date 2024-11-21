const mongoose = require("mongoose");

const EventImageSchema = new mongoose.Schema({
    image: {
        type: String,
        required: true,
    },
    eventId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Event",
        required: true,
    },
    imageName: {
        type: String,
        required: true,
        default: () => Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
    }
});

module.exports = mongoose.model("EventImage", EventImageSchema);
