const router = require("express").Router();
const { upload } = require("../helpers/file-upload");
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
  addPrimaryImage,
  updatePrimaryImage,
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

// Primary Image Addition Routes
router
  .route("/:id/primary-image")
  .post(upload.single("image"), addPrimaryImage)
  .put(upload.single("image"), updatePrimaryImage);

// secondary image addition routes

router
  .route("/:id/secondary-image")
  .post(upload.single("image"), addSecondaryImage)
  .put(upload.single("image"), updateSecondaryImage)
  .delete(deleteSecondaryImage);

module.exports = router;
