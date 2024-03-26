const categoryService = require("../services/category.service");
const { upload } = require("../helpers/file-upload");

const getAllCategories = async (req, res) => {
  const categories = await categoryService.getAllCategories();
  res.status(200).json(categories);
};

const getParentCategories = async (req, res) => {
  const categories = await categoryService.getParentCategories();
  res.json(categories);
};

const getSubcategories = async (req, res) => {
  const { parent_id } = req.params;
  const categories = await categoryService.getSubcategories({ parent_id });
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
  const { new_name, description, parent_id } = req.body;
  const { id } = req.params;
  const updatedCategory = await categoryService.updateCategory({
    new_name,
    id,
    description,
    parent_id,
  });
  res.status(200).json(updatedCategory);
};

const deleteCategory = async (req, res) => {
  const { id } = req.params;
  const deletedCategory = await categoryService.deleteCategory({ id });
  res.status(200).json(deletedCategory);
};

const addCategoryImage = async (req, res) => {
  const { category_id } = req.body;
  const image_url = req.imageNames[0];
  try {
    const updatedCategory = await categoryService.addCategoryImage({
      image_url,
      category_id,
    });
    res.status(200).json(updatedCategory);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

module.exports = {
  getAllCategories,
  getParentCategories,
  getSubcategories,
  createNewCategory,
  updateCategory,
  deleteCategory,
  getCategoryProducts,
  addCategoryImage,
};
