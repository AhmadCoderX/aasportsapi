const customProductEnquiryMail = ({
  tableContent,
  customerInfo,
  productInfo,
}) => {
  return `<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Enquiry</title>
  <style>
    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        color: #000;
        font-size: 16px;
    }

    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      margin: 0;
      padding: 0;
      max-width: 100vw;
    }

    .container {
      max-width: 100%;
      padding: 20px;
      border-radius: 5px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
    }

    h2 {
      margin-bottom: 20px;
      font-size: 40px;
    }

    .box {
      border-radius: 10px;
      padding: 20px;
      margin-bottom: 20px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
    }

    h3{
        font-size: 24px;
        margin-bottom: 5px;
    }

    .customer-info,
    .product-info {
      margin-bottom: 20px;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      border-radius: 10px;
      margin-bottom: 20px;
    }

    th,
    td {
      padding: 10px;
      text-align: left;
    }

    .message{
        font-size: 14px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

  </style>
</head>

<body>

  <div class="container">
    <h2>AA SPORTS USA has a new enquiry</h2>

    <h3>Customer Information</h3>
    <div class="box customer-info">
      <div>
        <strong>Name:</strong> ${customerInfo.name}
      </div>
      <div>
        <strong>Email:</strong> ${customerInfo.email}
      </div>
      <div>
        <strong>Phone Number:</strong> ${customerInfo.phoneNumber}
      </div>
      <div>
        <strong>Message:</strong> ${customerInfo.message}
      </div>
    </div>

    <h3>Product Information</h3>
    <div class="box product-info">
      <div>
        <strong>SKU:</strong> ${productInfo.sku}
      </div>
      <div>
        <strong>Name:</strong> ${productInfo.product_name}
      </div>
    </div>

    ${
      tableContent
        ? `<h3 class="roster-heading">Product Roster</h3>
    <table>
      <thead>
        <tr>
          <th>Number</th>
          <th>Name</th>
          <th>Top Size</th>
          <th>Bottom Size</th>
          <th>Qty</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>
        ${tableContent}
      </tbody>
    </table>`
        : ""
    }

  </div>

  <div class="message">
    <p>The user customized product images are attached to this email.</p>
  </div>

</body>

</html>`;
};

module.exports = customProductEnquiryMail;
