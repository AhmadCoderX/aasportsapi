const transporter = require("../helpers/sendEnquiryMail");
const fs = require("fs");

const sendEnquiry = async (req, res) => {
  const { recipient, subject, text } = req.body; // Destructure request body
  const frontCanvasBlob = req.files.frontCanvasImage[0].buffer; // assuming first element
  const backCanvasBlob = req.files.backCanvasImage[0].buffer; // assuming first element

  try {
    const message = {
      from: "Ahmad Hassan <developer@aasportsusa.com>",
      to: recipient,
      subject: subject,
      html: `<h3>${text}</h3>`,
      attachments: [
        {
          filename: "frontCanvasImage.png",
          content: frontCanvasBlob,
        },
        {
          filename: "backCanvasImage.png",
          content: backCanvasBlob,
        },
      ],
    };

    const info = await transporter.sendMail(message);

    res.json({ message: "Email sent successfully!", info });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ message: "Error sending email" });
  }
};

module.exports = { sendEnquiry };
