const {
  getParentCategoriesDb,
  getSubcategoriesDb,
  createCategoryDb,
  updateCategoryDb,
  getCategoryProductsDb,
} = require("../db/category.db");
const { ErrorHandler } = require("../helpers/error");
class CategoryService {
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
}

module.exports = new CategoryService();
