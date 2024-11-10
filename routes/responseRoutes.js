const express = require('express');
const router = express.Router();
const { getResponses } = require('../controllers/responseController');


router.get('/:formId',  getResponses);

module.exports = router;