const categoryService = require("../services/category.service");

const getAllCategories = async (req, res) => {
  const categories = await categoryService.getAllCategories();
  res.json(categories);
};

const createNewCategory = async (req, res) => {
  const data = req.body;
  const newCategory = await categoryService.createCategory(data);
  res.status(201).json(newCategory);
};

const getCategoryById = async (req, res) => {
  const category = await categoryService.getCategoryById({ id: req.params.id });
  res.status(200).json(category);
};

const changeCategoryName = async (req, res) => {
  const { category_new_name } = req.body;
  const { id } = req.params;
  const updatedCategory = await categoryService.changeCategoryName({
    category_new_name,
    id,
  });
  res.status(200).json(updatedCategory);
};

module.exports = {
  getAllCategories,
  createNewCategory,
  changeCategoryName,
  getCategoryById,
};
