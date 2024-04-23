const router = require("express").Router();
const { upload } = require("../helpers/file-upload");
const {
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getAllProducts,
  getProductReviews,
  createProductReview,
  addSecondaryImage,
  updateSecondaryImage,
  deleteSecondaryImage,
  addPrimaryImage,
  updatePrimaryImage,
  searchProduct,
  addProductTag,
  updateProductTag,
  deleteProductTag,
  deleteProductReview,
} = require("../controllers/products.controller");
const verifyToken = require("../middleware/verifyToken");

// Product Tags CRUD Routes
router
  .route("/tag")
  .post(addProductTag)
  .put(updateProductTag)
  .delete(deleteProductTag);

router.route("/").get(getAllProducts).post(createProduct);

router.route("/:id").get(getProduct).put(updateProduct).delete(deleteProduct);

// review routes
router
  .route("/:id/reviews")
  .get(getProductReviews)
  .post(createProductReview)
  .delete(deleteProductReview);

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

// Product Search API
router.route("/search/:searchTerm").get(searchProduct);

module.exports = router;
