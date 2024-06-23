// services/emailService.js

const nodemailer = require("nodemailer");
require("dotenv").config();
// Function to create and return a transporter instance
const createTransporter = () => {
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
};

// Function to create mail options
const createMailOptions = (toEmail, subject, text) => {
  return {
    from: process.env.EMAIL,
    to: toEmail,
    subject: subject,
    text: text,
  };
};

module.exports = {
  createTransporter,
  createMailOptions,
};
