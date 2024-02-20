const pool = require("../config/db");
const productService = require("../services/products.service");

const getAllProducts = async (req, res) => {
  const products = await productService.getAllProducts();
  res.json(products);
};

const createProduct = async (req, res) => {
  const newProduct = await productService.addProduct(req.body);
  res.status(200).json(newProduct);
};

const getProduct = async (req, res) => {
  const product = await productService.getProductById(req.params);
  res.status(200).json(product);
};

const updateProduct = async (req, res) => {
  const { name, description, category_id, product_image_url } = req.body;
  const { id } = req.params;
  const updatedProduct = await productService.updateProduct({
    name,
    description,
    category_id,
    product_image_url,
    id,
  });
  res.status(200).json(updatedProduct);
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const deletedProduct = await productService.removeProduct({ id });
  res.status(200).json(deletedProduct);
};

module.exports = {
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getAllProducts,
};
