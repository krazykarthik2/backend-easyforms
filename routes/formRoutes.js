const express = require('express');
const router = express.Router();
const { createForm, getAllForms, getFormById, updateForm, deleteForm ,getFormSlugByEventSlug,getFormSlugByEventId} = require('../controllers/formController');
const { loadToken, getUserFromToken, verifyAdminToken } = require('../middleware/authMiddleware');
router.post('/create',[loadToken, getUserFromToken, verifyAdminToken], createForm);
router.get('/', getAllForms);
router.get('/:id', getFormById);
router.get('/slug/:eventSlug/:slug', getFormSlugByEventSlug);
router.get('/slug/id/:eventId/:slug', getFormSlugByEventId);
router.put('/edit/:id', updateForm);
router.delete('/delete/:id', deleteForm);

module.exports = router;
