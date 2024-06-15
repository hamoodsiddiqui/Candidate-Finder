const { formData} = require('../models/formData');

exports.submitformData = async (req, res) => {
  const { age, location, qualification, additionalQualification } = req.body;

  try {
    const newformData = await formData.create({ age, location, qualification, additionalQualification });
    res.status(201).json({ message: 'Form data submitted successfully', formData: newformData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Form submission failed' });
  }
};
