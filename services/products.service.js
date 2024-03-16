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

  addSecondaryProductImage = async (data) => {
    try {
      return await addSecondaryImageDb(data);
    } catch (error) {
      throw new ErrorHandler(err.statusCode, err.message);
    }
  };

  updateSecondaryImage = async (data) => {
    try {
      return await updateSecondaryImageDb(data);
    } catch (error) {
      throw new ErrorHandler(err.statusCode, err.message);
    }
  };

  deleteSecondaryImage = async (data) => {
    try {
      return await deleteSecondaryImageDb(data);
    } catch (error) {
      throw new ErrorHandler(err.statusCode, err.message);
    }
  };
}

module.exports = new ProductService();
