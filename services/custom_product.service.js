const {
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
} = require("../db/custom_product.db");
const { ErrorHandler } = require("../helpers/error");

class customProductService {
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
}
module.exports = new customProductService();
