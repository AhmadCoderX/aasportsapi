const {
  getProductDb,
  getAllProductsDb,
  createProductDb,
  updateProductDb,
  deleteProductDb,
  addPrimaryImageDb,
  updatePrimaryImageDb,
  addSecondaryImageDb,
  updateSecondaryImageDb,
  deleteSecondaryImageDb,
  deleteAllImagesDb,
  searchProductDb,
  addProductTagDb,
  updateProductTagDb,
  deleteProductTagDb,
} = require("../db/products.db");
const { ErrorHandler } = require("../helpers/error");

class ProductService {
  getAllProducts = async () => {
    // Add code for limit and offset later
    try {
      return await getAllProductsDb();
    } catch (err) {
      throw new ErrorHandler(err.statusCode, err.message);
    }
  };
  addProduct = async (data) => {
    try {
      const createdProduct = await createProductDb(data);
      return createdProduct;
    } catch (err) {
      throw new ErrorHandler(err.statusCode, err.message);
    }
  };
  getProductById = async (id) => {
    try {
      console.log(typeof id);
      const product = await getProductDb(id);
      if (!product) {
        throw new ErrorHandler(404, "Product Not Found");
      }
      return product;
    } catch (err) {
      throw new ErrorHandler(err.statusCode, err.message);
    }
  };
  updateProduct = async (data) => {
    try {
      const product = await getProductDb({ id: data.id });
      if (!product) {
        throw new ErrorHandler(404, "Product Not Found!");
      }
      const updatedProduct = await updateProductDb(data);
      return updatedProduct;
    } catch (err) {
      throw new ErrorHandler(err.statusCode, err.message);
    }
  };

  removeProduct = async ({ id }) => {
    try {
      console.log(typeof id);

      const product = await getProductDb({ id });
      if (!product) {
        throw new ErrorHandler(404, "Product Not Found!");
      }
      console.log(product);
      await deleteAllImagesDb({ product_id: id });
      return await deleteProductDb({ id });
    } catch (err) {
      throw new ErrorHandler(err.statusCode, err.message);
    }
  };

  addPrimaryProductImage = async (data) => {
    try {
      return await addPrimaryImageDb(data);
    } catch (error) {
      throw new ErrorHandler(error.statusCode, error.message);
    }
  };

  updatePrimaryImage = async (data) => {
    try {
      return await updatePrimaryImageDb(data);
    } catch (error) {
      throw new ErrorHandler(error.statusCode, error.message);
    }
  };

  addSecondaryProductImage = async (data) => {
    try {
      return await addSecondaryImageDb(data);
    } catch (error) {
      throw new ErrorHandler(error.statusCode, error.message);
    }
  };

  updateSecondaryImage = async (data) => {
    try {
      return await updateSecondaryImageDb(data);
    } catch (error) {
      throw new ErrorHandler(error.statusCode, error.message);
    }
  };

  deleteSecondaryImage = async (data) => {
    try {
      return await deleteSecondaryImageDb(data);
    } catch (error) {
      throw new ErrorHandler(error.statusCode, error.message);
    }
  };

  searchProduct = async (query) => {
    try {
      return await searchProductDb(query);
    } catch (error) {
      throw new ErrorHandler(error.statusCode, error.message);
    }
  };

  addProductTag = async (data) => {
    try {
      return await addProductTagDb(data);
    } catch (error) {
      throw new ErrorHandler(error.statusCode, error.message);
    }
  };

  updateProductTag = async (data) => {
    try {
      return await updateProductTagDb(data);
    } catch (error) {
      throw new ErrorHandler(error.statusCode, error.message);
    }
  };

  deleteProductTag = async (data) => {
    try {
      return await deleteProductTagDb(data);
    } catch (error) {
      throw new ErrorHandler(error.statusCode, error.message);
    }
  };
}

module.exports = new ProductService();
