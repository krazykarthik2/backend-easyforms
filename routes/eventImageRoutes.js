const express = require("express");
const router = express.Router();
const { createEventImage, getEventImages, deleteEventImage,getEventImageById, createEventImagesBulk } = require("../controllers/eventImageController");
const { verifyAdminToken, loadToken,  getUserFromToken } = require("../middleware/authMiddleware");

router.post("/:eventId/create", [loadToken,getUserFromToken , verifyAdminToken], createEventImage);
router.get("/:eventId", getEventImages);
router.get("/id/:imageId", getEventImageById);
router.delete("/delete/:imageId", [loadToken,getUserFromToken , verifyAdminToken], deleteEventImage);
router.post("/:eventId/create_bulk", [loadToken,getUserFromToken , verifyAdminToken], createEventImagesBulk);
module.exports = router;