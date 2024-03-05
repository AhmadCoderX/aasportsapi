const categoryService = require("../services/category.service");

const getAllCategories = async (req, res) => {
  const categories = await categoryService.getAllCategories();
  res.status(200).json(categories);
};

const getParentCategories = async (req, res) => {
  const categories = await categoryService.getParentCategories();
  res.json(categories);
};

const getSubcategories = async (req, res) => {
  const categories = await categoryService.getSubcategories(req.body);
  res.json(categories);
};

const createNewCategory = async (req, res) => {
  const data = req.body;
  const newCategory = await categoryService.createCategory(data);
  res.status(201).json(newCategory);
};

const getCategoryProducts = async (req, res) => {
  const category = await categoryService.getCategoryProducts({
    id: req.params.id,
  });
  res.status(200).json(category);
};

const updateCategory = async (req, res) => {
  const { new_name, description } = req.body;
  const { id } = req.params;
  const updatedCategory = await categoryService.updateCategory({
    new_name,
    id,
    description,
  });
  res.status(200).json(updatedCategory);
};

module.exports = {
  getAllCategories,
  getParentCategories,
  getSubcategories,
  createNewCategory,
  updateCategory,
  getCategoryProducts,
};
