const { formdata, users } = require("../models");
// const nodemailer = require("nodemailer");
const {
  createTransporter,
  createMailOptions,
} = require("../services/emailService");
require("dotenv").config();
// exports.getAdminView = async (req, res) => {
//   try {
//     const formData = await formdata.findAll({
//       include: [
//         {
//           model: users,
//           attributes: ["username", "email"],
//         },
//       ],
//     });
//     console.log(JSON.stringify(formData, null, 2));
//     res.render("adminView.ejs", { formData });
//   } catch (err) {
//     console.error("Error fetching admin view data:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// };

exports.getAdminView = async (req, res) => {
  try {
    const formData = await formdata.findAll({
      include: [
        {
          model: users,
          attributes: ["username", "email"],
        },
      ],
    });
    res.render("adminView.ejs", { formData });
  } catch (err) {
    console.error("Error fetching admin view data:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// controllers/adminController.js

// Function to send email

// POST route to send email
exports.sendEmail = async (req, res) => {
  const { email } = req.body;

  try {
    // Create a transporter with your email service credentials
    let transporter = createTransporter();

    // Setup email data using createMailOptions function
    let mailOptions = createMailOptions(
      email,
      "EOBI IT JOB SERVICES", // (Subject)
      "Dear Applicant,\nThank you for taking the time to apply for the Software position. We have reviewed your resume and would like to discuss your qualifications further.\n\nBest regards,\nEOBI IT JOB SERVICES" // (Body of the email)
    );

    // Send email
    let info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);

    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ message: "Failed to send email" });
  }
};
