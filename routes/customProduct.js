const router = require("express").Router();
const {
  getAllCustomProducts,
  createCustomProduct,
  updateCustomProduct,
  deleteCustomProduct,
  addFrontThumbImage,
  addBackThumbImage,
  addFrontPath,
  addBackPath,
  addFrontText,
  addBackText,
  addFrontMaskImage,
  addBackMaskImage,
  updateFrontPath,
  deleteFrontPath,
  updateBackPath,
  deleteBackPath,
  updateFrontText,
  deleteFrontText,
  updateBackText,
  deleteBackText,
  updateFrontMaskImage,
  deleteFrontMaskImage,
  updateBackMaskImage,
  deleteBackMaskImage,
  getCustomProduct,
  createUserCustomProduct,
  updateUserCustomProduct,
  getUserCustomProduct,
  deleteUserCustomProduct,
  getALlUserCustomProduct,
} = require("../controllers/custom_product.controller");
const { upload } = require("../helpers/file-upload");

router.route("/").get(getAllCustomProducts).post(createCustomProduct);
router
  .route("/:c_id")
  .get(getCustomProduct)
  .put(updateCustomProduct)
  .delete(deleteCustomProduct);

router
  .route("/front-thumb-image/:id")
  .post(upload.single("image"), addFrontThumbImage);

router
  .route("/back-thumb-image/:id")
  .post(upload.single("image"), addBackThumbImage);

router.route("/front-path").post(addFrontPath);

router
  .route("/front-path/:front_object_id")
  .put(updateFrontPath)
  .delete(deleteFrontPath);

router.route("/back-path").post(addBackPath);

router
  .route("/back-path/:back_object_id")
  .put(updateBackPath)
  .delete(deleteBackPath);

router.route("/front-text").post(addFrontText);

router
  .route("/front-text/:front_text_id")
  .put(updateFrontText)
  .delete(deleteFrontText);

router.route("/back-text").post(addBackText);

router
  .route("/back-text/:back_text_id")
  .put(updateBackText)
  .delete(deleteBackText);

router
  .route("/front-mask-image")
  .post(upload.single("image"), addFrontMaskImage)
  .delete(deleteFrontMaskImage);

router
  .route("/front-mask-image/:id")
  .put(updateFrontMaskImage)
  .delete(deleteFrontMaskImage);

router
  .route("/back-mask-image")
  .post(upload.single("image"), addBackMaskImage)
  .delete(deleteBackMaskImage);

router
  .route("/back-mask-image/:id")
  .put(updateBackMaskImage)
  .delete(deleteBackMaskImage);

// User Custom Product Routes
router.route("/user-custom-product").post(createUserCustomProduct);

router
  .route("/user-custom-product/:user_custom_product_id")
  .get(getUserCustomProduct)
  .put(updateUserCustomProduct)
  .delete(deleteUserCustomProduct);

// Get all user custom products

router
  .route("/all-user-custom-products/:customer_id")
  .get(getALlUserCustomProduct);

module.exports = router;
