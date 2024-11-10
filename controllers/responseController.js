const mongoose = require('mongoose');
require("../models/Response");
const Response = require('../models/Response');

const getResponses = async (req, res) => {
    console.log('getResponses',req.params.formId);
    const responses = await Response.find({ formId: req.params.formId });
    res.json(responses);
};

module.exports = { getResponses };

