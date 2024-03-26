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

router.route("/all").get(getAllCategories);
router.route("/image-upload").put(upload.single("image"), addCategoryImage);
router.route("/sub-categories/:parent_id").get(getSubcategories);
router.route("/").get(getParentCategories).post(createNewCategory);
router
  .route("/:id")
  .get(getCategoryProducts)
  .put(updateCategory)
  .delete(deleteCategory); // Get category by ID actually return all the products in the category

module.exports = router;
