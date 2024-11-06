const Response = require('../models/Response');
const Form = require('../models/Form');

// Submit a response for a form
exports.submitResponse = async (req, res) => {
    try {
        const { formId } = req.params;
        const responseData = req.body; // Incoming responses as key-value pairs

        // Find the form to get field definitions
        const form = await Form.findById(formId);
        if (!form) return res.status(404).json({ message: 'Form not found' });

        // Validation logic based on the form's field definitions
        const errors = [];
        form.attributes.forEach((attribute,index) => {
            const value = responseData[index];

            // Check if required fields are filled
            if (attribute.required && (value === undefined|| value===null || value === '')) {
                errors.push(`${attribute.label} is required.`);
            }

            // Validate regex format if provided
            if (attribute.regexFormat && value) {
                const regex = new RegExp(attribute.regexFormat);
                if (!regex.test(value)) {
                    errors.push(`${attribute.fieldName} does not match required format.`);
                }
            }

            // TODO: Add additional validation as needed based on fieldType (e.g., checkboxes, dropdowns)
            // ...
        });

        if (errors.length) {
            return res.status(400).json({ errors });
        }

        // Save the response
        const response = new Response({
            form: form._id,
            event: form.event,
            answers: responseData
        });

        await response.save();
        res.status(201).json(response);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
