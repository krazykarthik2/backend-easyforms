const mongoose = require("mongoose");
const Response = require("../models/Response");
require("../models/Form");
const Form = mongoose.model("Form");
const validator = require("validator");
// Submit a response for a form
exports.respondToForm = async (req, res) => {
  try {
    const { formId } = req.params;
    const responseData = req.body; // Incoming responses as key-value pairs
    console.log("respondToForm", responseData);
  
    // Find the form to get field definitions
    const form = await Form.findById(formId);
    if (!form) return res.status(404).json({ message: "Form not found" });

    // Validation logic based on the form's field definitions
    const errors = [];
    form.attributes.forEach((item, index) => {
      const key  = Object.keys(responseData[index])[0];
      let value = responseData[index][key];

      if (!(key in item.question)){
        throw "some field is missing";
      }
      console.log('$$$$$$$$$$$$$$$$$$',value,key)
      // Check if required fields are filled
      if(key=="paragraphInput" || key=="textInput"){
        value= value.trim()// trim all paragraphInputs
      }
      if (
        item.required &&
        (value === undefined || value === null || value === "" ||( Array.isArray(value)&&value.length===0) )
      ) {
        errors.push(`${item.label} is required.`);
      }

      if(key === "emailInput" && !validator.isEmail(value)){
        errors.push(`${item.label} is not a valid email.`);
      }
      
      // TODO: Add additional validation as needed based on fieldType (e.g., checkboxes, dropdowns)
      // ...
    });

    if (errors.length) {
      return res.status(400).json({ errors });
    }
    console.log("responseData", responseData);
    // Save the response
    const response = new Response({
      formId: form._id,
      eventId: form.eventId,
      answers: responseData,
      submittedBy: req.user._id,
    });
    await response.save();
    res.status(201).json(response);
  } catch (error) {
    console.log("respondToForm", error);
    res.status(500).json({ message: error.message });
  }
};
exports.checkResponse = async (req, res) => {
  try {
    const userId = req.user._id;
    const formId = req.params.formId;
    const response = await Response.findOne({
      submittedBy: userId,
      formId: formId,
    });
    if (response) {
      return res.status(200).json({ result:true, message: "Response already submitted" });
    }
    return res.status(200).json({ result: false, message: "Response not submitted" });
  } catch (error) {
    console.log("checkResponse", error);
    res.status(500).json({ message: error.message });
  }
};

