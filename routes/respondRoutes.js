const express = require('express');
const router = express.Router();
const { respondToForm } = require('../controllers/respondController');
const { loadToken, getUserFromToken, verifyUserToken } = require('../middleware/authMiddleware');

router.post('/form/:formId',[loadToken, getUserFromToken, verifyUserToken], respondToForm);

module.exports = router;

