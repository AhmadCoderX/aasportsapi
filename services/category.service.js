const {
  getAllCategoriesDb,
  getParentCategoriesDb,
  getSubcategoriesDb,
  createCategoryDb,
  updateCategoryDb,
  deleteCategoryDb,
  getCategoryProductsDb,
  addCategoryImageDb,
} = require("../db/category.db");
const { ErrorHandler } = require("../helpers/error");
class CategoryService {
  getAllCategories = async () => {
    try {
      return await getAllCategoriesDb();
    } catch (error) {
      throw new ErrorHandler(error.statusCode, error.message);
    }
  };

  getParentCategories = async () => {
    try {
      return await getParentCategoriesDb();
    } catch (error) {
      throw new ErrorHandler(error.statusCode, error.message);
    }
  };

  getSubcategories = async (data) => {
    try {
      return await getSubcategoriesDb(data);
    } catch (error) {
      throw new ErrorHandler(error.statusCode, error.message);
    }
  };

  createCategory = async (data) => {
    try {
      return await createCategoryDb(data);
    } catch (error) {
      throw new ErrorHandler(error.statusCode, error.message);
    }
  };

  getCategoryProducts = async (data) => {
    try {
      return await getCategoryProductsDb(data);
    } catch (error) {
      throw new ErrorHandler(error.statusCode, error.message);
    }
  };

  updateCategory = async (data) => {
    try {
      return await updateCategoryDb(data);
    } catch (error) {
      throw new ErrorHandler(error.statusCode, error.message);
    }
  };

  deleteCategory = async (id) => {
    try {
      return await deleteCategoryDb(id);
    } catch (error) {
      throw new ErrorHandler(error.statusCode, error.message);
    }
  };

  addCategoryImage = async (data) => {
    try {
      return await addCategoryImageDb(data);
    } catch (error) {
      throw new ErrorHandler(error.statusCode, error.message);
    }
  };
}

module.exports = new CategoryService();
