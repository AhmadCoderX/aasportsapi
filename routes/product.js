const router = require("express").Router();
const {
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getAllProducts,
} = require("../controllers/products.controller");

router.route("/").get(getAllProducts).post(createProduct);

router.route("/:id").get(getProduct).put(updateProduct).delete(deleteProduct);

module.exports = router;
