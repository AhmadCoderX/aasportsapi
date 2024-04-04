const customProductEnquiryMail = require("../helpers/customProductEnquiry");
const transporter = require("../helpers/sendEnquiryMail");
const fs = require("fs");

const sendEnquiry = async (req, res) => {
  const {
    name,
    email,
    phoneNumber,
    subject,
    message,
    sku,
    product_name,
    productRoster,
  } = req.body; // Destructure request body

  let attachments = [];
  if (req.files) {
    const frontCanvasBlob = req.files?.frontCanvasImage
      ? req.files?.frontCanvasImage[0].buffer
      : null; // assuming first element
    const backCanvasBlob = req.files?.backCanvasImage
      ? req.files?.backCanvasImage[0].buffer
      : null; // assuming first element

    if (frontCanvasBlob) {
      attachments.push({
        filename: "frontCanvasImage.png",
        content: frontCanvasBlob,
      });
    }
    if (backCanvasBlob) {
      attachments.push({
        filename: "backCanvasImage.png",
        content: backCanvasBlob,
      });
    }
  }

  // productRoster will be used instead of jsonData

  const jsonData = [
    {
      number: 12,
      name: "Ahmad",
      topSize: "YS",
      bottomSize: "YS",
      qty: 1,
      price: 25,
    },
    {
      number: 12,
      name: "Ahmad",
      topSize: "YS",
      bottomSize: "YS",
      qty: 1,
      price: 25,
    },
    // ... other data objects
  ];
  let tableContent = "";
  productRoster?.forEach((item) => {
    tableContent += `<tr>
    <td>${item.number}</td>
    <td>${item.name}</td>
    <td>${item.topSize}</td>
    <td>${item.bottomSize}</td>
    <td>${item.qty}</td>
    <td>${item.price}</td>
  </tr>`;
  });
  if (!productRoster) {
    tableContent = false;
  }

  try {
    const enquiryMail = {
      from: "Ahmad Hassan <developer@aasportsusa.com>",
      to: "hjamiplu@gmail.com",
      subject: subject,
      html: customProductEnquiryMail({
        tableContent,
        customerInfo: { name, email, message, phoneNumber },
        productInfo: { sku, product_name },
      }),
      attachments: attachments,
    };

    const info = await transporter.sendMail(enquiryMail);

    res.json({ message: "Email sent successfully!", info });
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error(error);
    res.status(500).json({ message: "Error sending email" });
  }
};

module.exports = { sendEnquiry };
