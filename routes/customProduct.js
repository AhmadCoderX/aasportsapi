const router = require("express").Router();
const {
  createCustomProduct,
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
} = require("../controllers/custom_product.controller");

router.route("/").post(createCustomProduct);

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

router.route("/front-mask-image").post(addFrontMaskImage);

router
  .route("/front-mask-image/:id")
  .put(updateFrontMaskImage)
  .delete(deleteFrontMaskImage);

router.route("/back-mask-image").post(addBackMaskImage);

router
  .route("/back-mask-image/:id")
  .put(updateBackMaskImage)
  .delete(deleteBackMaskImage);

module.exports = router;
