const {
  getAllCustomProductsDb,
  createCustomProductDb,
  addFrontPathDb,
  addBackPathDb,
  AddFrontTextDb,
  AddBackTextDb,
  addFrontMaskImageDb,
  addBackMaskImageDb,
  updateFrontPathDb,
  deleteFrontPathDb,
  updateBackPathDb,
  deleteBackPathDb,
  updateFrontTextDb,
  deleteFrontTextDb,
  updateBackTextDb,
  deleteBackTextDb,
  updateFrontMaskImageDb,
  deleteFrontMaskImageDb,
  updateBackMaskImageDb,
  deleteBackMaskImageDb,
  getCustomProductDb,
  createUserCustomProductDb,
  getUserCustomProductDb,
  updateUserCustomProductDb,
  deleteUserCustomProductDb,
  getAllUserCustomProductDb,
} = require("../db/custom_product.db");
const { ErrorHandler } = require("../helpers/error");

class customProductService {
  getAllCustomProducts = async () => {
    try {
      return await getAllCustomProductsDb();
    } catch (error) {
      throw new ErrorHandler(error.statusCode, error.message);
    }
  };

  createCustomProduct = async (data) => {
    try {
      return await createCustomProductDb(data);
    } catch (error) {
      throw new ErrorHandler(error.statusCode, error.message);
    }
  };

  addFrontPath = async (data) => {
    try {
      return await addFrontPathDb(data);
    } catch (error) {
      throw new ErrorHandler(error.statusCode, error.message);
    }
  };

  addBackPath = async (data) => {
    try {
      return await addBackPathDb(data);
    } catch (error) {
      throw new ErrorHandler(error.statusCode, error.message);
    }
  };

  addFrontText = async (data) => {
    try {
      return await AddFrontTextDb(data);
    } catch (error) {
      throw new ErrorHandler(error.statusCode, error.message);
    }
  };

  addBackText = async (data) => {
    try {
      return await AddBackTextDb(data);
    } catch (error) {
      throw new ErrorHandler(error.statusCode, error.message);
    }
  };

  addFrontMaskImage = async (data) => {
    try {
      return await addFrontMaskImageDb(data);
    } catch (error) {
      throw new ErrorHandler(error.statusCode, error.message);
    }
  };

  addBackMaskImage = async (data) => {
    try {
      return await addBackMaskImageDb(data);
    } catch (error) {
      throw new ErrorHandler(error.statusCode, error.message);
    }
  };

  updateFrontPath = async (data) => {
    try {
      return await updateFrontPathDb(data);
    } catch (error) {
      throw new ErrorHandler(error.statusCode, error.message);
    }
  };

  deleteFrontPath = async (id) => {
    try {
      return await deleteFrontPathDb(id);
    } catch (error) {
      throw new ErrorHandler(error.statusCode, error.message);
    }
  };

  updateBackPath = async (data) => {
    try {
      return await updateBackPathDb(data);
    } catch (error) {
      throw new ErrorHandler(error.statusCode, error.message);
    }
  };

  deleteBackPath = async (id) => {
    try {
      return await deleteBackPathDb(id);
    } catch (error) {
      throw new ErrorHandler(error.statusCode, error.message);
    }
  };

  updateFrontText = async (data) => {
    try {
      return await updateFrontTextDb(data);
    } catch (error) {
      throw new ErrorHandler(error.statusCode, error.message);
    }
  };

  deleteFrontText = async (id) => {
    try {
      return await deleteFrontTextDb(id);
    } catch (error) {
      throw new ErrorHandler(error.statusCode, error.message);
    }
  };

  updateBackText = async (data) => {
    try {
      return await updateBackTextDb(data);
    } catch (error) {
      throw new ErrorHandler(error.statusCode, error.message);
    }
  };

  deleteBackText = async (id) => {
    try {
      return await deleteBackTextDb(id);
    } catch (error) {
      throw new ErrorHandler(error.statusCode, error.message);
    }
  };

  updateFrontMaskImage = async (data) => {
    try {
      return await updateFrontMaskImageDb(data);
    } catch (error) {
      throw new ErrorHandler(error.statusCode, error.message);
    }
  };

  updateBackMaskImage = async (data) => {
    try {
      return await updateBackMaskImageDb(data);
    } catch (error) {
      throw new ErrorHandler(error.statusCode, error.message);
    }
  };

  deleteFrontMaskImage = async (id) => {
    try {
      return await deleteFrontMaskImageDb(id);
    } catch (error) {
      throw new ErrorHandler(error.statusCode, error.message);
    }
  };

  deleteBackMaskImage = async (id) => {
    try {
      return await deleteBackMaskImageDb(id);
    } catch (error) {
      throw new ErrorHandler(error.statusCode, error.message);
    }
  };

  getCustomProduct = async (id) => {
    try {
      return await getCustomProductDb(id);
    } catch (error) {
      throw new ErrorHandler(error.statusCode, error.message);
    }
  };

  createUserCustomProduct = async (data) => {
    try {
      return await createUserCustomProductDb(data);
    } catch (error) {
      throw new ErrorHandler(error.statusCode, error.message);
    }
  };

  getUserCustomProduct = async (id) => {
    try {
      const product = await getUserCustomProductDb(id);
      if (product) {
        return product;
      } else {
        return "Product not found";
      }
    } catch (error) {
      throw new ErrorHandler(error.statusCode, error.message);
    }
  };

  updateUserCustomProduct = async (data) => {
    try {
      const { user_custom_product_id } = data;
      const userProduct = await getUserCustomProductDb({
        user_custom_product_id,
      });
      if (userProduct) {
        return await updateUserCustomProductDb(data);
      } else {
        return "Product not found";
      }
    } catch (error) {
      throw new ErrorHandler(error.statusCode, error.message);
    }
  };

  deleteUserCustomProduct = async (id) => {
    try {
      const userProduct = await getUserCustomProductDb(id);
      if (userProduct) {
        return await deleteUserCustomProductDb(id);
      } else {
        return "Product not found";
      }
    } catch (error) {
      throw new ErrorHandler(error.statusCode, error.message);
    }
  };

  getAllUserCustomProduct = async (id) => {
    try {
      return await getAllUserCustomProductDb(id);
    } catch (error) {
      throw new ErrorHandler(error.statusCode, error.message);
    }
  };
}
module.exports = new customProductService();
