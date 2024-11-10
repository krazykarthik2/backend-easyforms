const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');

router.get('/', eventController.getAllEvents);
router.get('/s/:slug', eventController.getEventBySlug);
router.post('/create', eventController.createEvent);
router.get('/:id', eventController.getEventById);
router.put('/edit/:id', eventController.updateEvent);
router.delete('/delete/:id', eventController.deleteEvent);

module.exports = router;
