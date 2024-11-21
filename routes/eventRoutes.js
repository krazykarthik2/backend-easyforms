const express = require('express');
const router = express.Router();
const { getAllEvents, getEventBySlug, createEvent, getEventById, updateEvent, deleteEvent } = require('../controllers/eventController');
const eventImageRoutes = require('../routes/eventImageRoutes');
router.get('/', getAllEvents);
router.get('/s/:slug', getEventBySlug);
router.post('/create', createEvent);
router.get('/:id', getEventById);
router.put('/edit/:id', updateEvent);
router.delete('/delete/:id', deleteEvent);

router.use('/images', eventImageRoutes);
module.exports = router;
