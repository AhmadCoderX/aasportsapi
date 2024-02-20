const router = require("express").Router();
const product = require("./product");

router.use("/products", product);

module.exports = router;
