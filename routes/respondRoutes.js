const express = require('express');
const router = express.Router();
const { respondToForm ,checkResponse } = require('../controllers/respondController');
const { loadToken, getUserFromToken, verifyUserToken } = require('../middleware/authMiddleware');
router.post('/form/:formId',[loadToken, getUserFromToken, verifyUserToken], respondToForm);
router.get('/check/:formId',[loadToken, getUserFromToken, verifyUserToken], checkResponse);
module.exports = router;

