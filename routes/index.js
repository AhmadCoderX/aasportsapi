const router = require("express").Router();
const product = require("./product");
const user = require("./user");
const cart = require("./cart");
const auth = require("./auth");
const category = require("./category");

router.use("/products", product);
router.use("/users", user);
router.use("/cart", cart);
router.use("/auth", auth);
router.use("/category", category);

module.exports = router;
