const router = require("express").Router();
const {
  getAllCategories,
  getParentCategories,
  getSubcategories,
  createNewCategory,
  updateCategory,
  deleteCategory,
  getCategoryProducts,
} = require("../controllers/category.controller");

router.route("/all").get(getAllCategories);
router.route("/").get(getParentCategories).post(createNewCategory);
router.route("/sub-categories").get(getSubcategories);
router
  .route("/:id")
  .get(getCategoryProducts)
  .put(updateCategory)
  .delete(deleteCategory); // Get category by ID actually return all the products in the category

module.exports = router;
