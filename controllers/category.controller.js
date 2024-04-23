const categoryService = require("../services/category.service");
const fs = require("fs");
const { upload } = require("../helpers/file-upload");
const path = require("path");

const getAllCategories = async (req, res) => {
  try {
    const categories = await categoryService.getAllCategories();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getParentCategories = async (req, res) => {
  try {
    const categories = await categoryService.getParentCategories();
    res.json(categories);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getSubcategories = async (req, res) => {
  try {
    const { parent_id } = req.params;
    const categories = await categoryService.getSubcategories({ parent_id });
    res.json(categories);
  } catch (error) {
    res.status(500).json(error);
  }
};

const createNewCategory = async (req, res) => {
  try {
    const data = req.body;
    const newCategory = await categoryService.createCategory(data);
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getCategoryProducts = async (req, res) => {
  try {
    const category = await categoryService.getCategoryProducts({
      id: req.params.id,
    });
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json(error);
  }
};

const updateCategory = async (req, res) => {
  try {
    const { new_name, description, parent_id } = req.body;
    const { id } = req.params;
    const updatedCategory = await categoryService.updateCategory({
      new_name,
      id,
      description,
      parent_id,
    });
    res.status(200).json(updatedCategory);
  } catch (error) {
    res.status(500).json(error);
  }
};

const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCategory = await categoryService.deleteCategory({ id });
    const { category_img_url } = deletedCategory;
    const filePath = path.join(__dirname, "..", "uploads", category_img_url);
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error("Error deleting file:", err);
      } else {
        console.log("File deleted successfully");
      }
    });
    res.status(200).json(deletedCategory);
  } catch (error) {
    res.status(500).json(error);
  }
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
