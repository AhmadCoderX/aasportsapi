const {
  getAllCategoriesDb,
  createCategoryDb,
  changeCategoryNameDb,
  getCategoryById,
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

  createCategory = async (data) => {
    try {
      return await createCategoryDb(data);
    } catch (error) {
      throw new ErrorHandler(error.statusCode, error.message);
    }
  };

  getCategoryById = async (data) => {
    try {
      return await getCategoryById(data);
    } catch (error) {
      throw new ErrorHandler(error.statusCode, error.message);
    }
  };

  changeCategoryName = async (data) => {
    try {
      return await changeCategoryNameDb(data);
    } catch (error) {
      throw new ErrorHandler(error.statusCode, error.message);
    }
  };
}

module.exports = new CategoryService();
