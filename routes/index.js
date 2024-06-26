const router = require("express").Router();
const product = require("./product");
const user = require("./user");
const cart = require("./cart");
const auth = require("./auth");
const category = require("./category");
const order = require("./order");
const swaggerUi = require("swagger-ui-express");
const payment = require("./payment");
const customProduct = require("./customProduct");
const enquiry = require("./enquiry");
const cors = require("cors");

router.use("/products", product);
router.use("/users", user);
router.use("/cart", cart);
router.use("/auth", cors(), auth);
router.use("/category", category);
router.use("/order", order);
router.use("/payment", payment);
router.use("/custom-product", customProduct);
router.use("/send-enquiry", enquiry);
// router.use("/docs", swaggerUi.serve, swaggerUi.setup(docs));

module.exports = router;
