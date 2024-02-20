const {
  getProductDb,
  getAllProductsDb,
  createProductDb,
  updateProductDb,
  deleteProductDb,
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
      return await createProductDb(data);
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
      console.log(typeof data.id);
      const product = await getProductDb({ id: data.id });
      if (!product) {
        throw new ErrorHandler(404, "Product Not Found!");
      }
      return await updateProductDb(data);
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
      return await deleteProductDb({ id });
    } catch (err) {
      throw new ErrorHandler(err.statusCode, err.message);
    }
  };
}

module.exports = new ProductService();
