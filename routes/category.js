const router = require("express").Router();
const {
  getParentCategories,
  getSubcategories,
  createNewCategory,
  updateCategory,
  getCategoryProducts,
} = require("../controllers/category.controller");

router.route("/").get(getParentCategories).post(createNewCategory);
router.route("/sub-categories").get(getSubcategories);
router.route("/:id").get(getCategoryProducts).put(updateCategory); // Get category by ID actually return all the products in the category

module.exports = router;
