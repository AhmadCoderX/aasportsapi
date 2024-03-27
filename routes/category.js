const router = require("express").Router();
const {
  getAllCategories,
  getParentCategories,
  getSubcategories,
  createNewCategory,
  updateCategory,
  deleteCategory,
  getCategoryProducts,
  addCategoryImage,
} = require("../controllers/category.controller");
const { upload } = require("../helpers/file-upload");

// Define image upload route before the route with parameter ":id"
router.route("/image-upload").put(upload.single("image"), addCategoryImage);

// Define other routes
router.route("/all").get(getAllCategories);
router.route("/sub-categories/:parent_id").get(getSubcategories);
router.route("/").get(getParentCategories).post(createNewCategory);
router
  .route("/:id")
  .get(getCategoryProducts)
  .put(updateCategory)
  .delete(deleteCategory);

module.exports = router;
