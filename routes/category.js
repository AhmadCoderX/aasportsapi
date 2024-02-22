const router = require("express").Router();
const {
  getAllCategories,
  createNewCategory,
  changeCategoryName,
  getCategoryById,
} = require("../controllers/category.controller");

router.route("/").get(getAllCategories).post(createNewCategory);
router.route("/:id").get(getCategoryById).put(changeCategoryName);

module.exports = router;
