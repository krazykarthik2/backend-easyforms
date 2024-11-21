const mongoose = require("mongoose");
require("../models/Response");
const Response = require("../models/Response");
const populateUser = { path: "submittedBy", select: "name email" }
const getResponses = async (req, res) => {
  console.log("getResponses", req.params.formId);
  const responses = await Response.find({ formId: req.params.formId }).populate(
    populateUser
  );
  res.json(responses);
};

module.exports = { getResponses };
