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

router.route("/").get(getAllProducts).post(createProduct);

router.route("/:id").get(getProduct).put(updateProduct).delete(deleteProduct);

// review routes
router
  .route("/:id/reviews")
  .get(getProductReviews)
  .post(createProductReview)
  .put(updateProductReview);

// secondary image addition routes

router
  .route("/:id/secondary-image")
  .post(addSecondaryImage)
  .put(updateSecondaryImage)
  .delete(deleteSecondaryImage);

module.exports = router;
