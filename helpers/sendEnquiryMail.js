const nodemailer = require("nodemailer");

require("dotenv").config();

const transporter = nodemailer.createTransport({
  host: "mail.aasportsusa.com",
  secureConnection: 465,
  secure: true,
  auth: {
    user: "developer@aasportsusa.com",
    pass: "y9bSDhQUWYnHjw8iD",
  },
});

module.exports = transporter;
