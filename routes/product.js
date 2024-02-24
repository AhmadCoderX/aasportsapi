const router = require("express").Router();
const {
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getAllProducts,
  getProductReviews,
  updateProductReview,
  createProductReview,
  addSecondaryImage,
  updateSecondaryImage,
  deleteSecondaryImage,
} = require("../controllers/products.controller");
const verifyToken = require("../middleware/verifyToken");

router.route("/").get(getAllProducts).post(verifyToken, createProduct);

router
  .route("/:id")
  .get(getProduct)
  .put(verifyToken, updateProduct)
  .delete(verifyToken, deleteProduct);
// review routes
router
  .route("/:id/reviews")
  .get(getProductReviews)
  .post(verifyToken, createProductReview)
  .put(verifyToken, updateProductReview);

// secondary image addition routes

router
  .route("/:id/secondary-image")
  .post(addSecondaryImage)
  .put(updateSecondaryImage)
  .delete(deleteSecondaryImage);

module.exports = router;
