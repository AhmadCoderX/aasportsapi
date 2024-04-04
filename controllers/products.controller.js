const pool = require("../config/db");
const { ErrorHandler } = require("../helpers/error");
const productService = require("../services/products.service");

const getAllProducts = async (req, res) => {
  const products = await productService.getAllProducts();
  res.json(products);
};

const createProduct = async (req, res) => {
  const { name, description, category_id, sku, type } = req.body;
  const newProduct = await productService.addProduct({
    name,
    description,
    category_id,
    sku,
    type,
  });
  res.status(200).json(newProduct);
};

const getProduct = async (req, res) => {
  const product = await productService.getProductById(req.params);
  res.status(200).json(product);
};

const updateProduct = async (req, res) => {
  const { name, description, category_id, sku, type } = req.body;
  const { id } = req.params;
  const updatedProduct = await productService.updateProduct({
    name,
    description,
    category_id,
    id,
    sku,
    type,
  });
  res.status(200).json(updatedProduct);
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const deletedProduct = await productService.removeProduct({ id });
  res.status(200).json(deletedProduct);
};

const getProductReviews = async (req, res) => {
  const { product_id } = req.body;
  const { id: user_id } = req.body.user;
  try {
    // check if current logged user review exist for the product
    const reviewExist = await pool.query(
      "SELECT EXISTS (SELECT * FROM reviews where product_id = $1 and user_id = $2)",
      [product_id, user_id]
    );

    // get reviews associated with the product
    const reviews = await pool.query(
      `SELECT customer.name as customer_name, reviews.* FROM reviews
        join customer 
        on customer.id = reviews.user_id
        WHERE reviews.product_id = $1`,
      [product_id]
    );
    res.status(200).json({
      reviewExist: reviewExist.rows[0].exists,
      reviews: reviews.rows,
    });
  } catch (error) {
    throw new ErrorHandler(error.statusCode, error.message);
  }
};

const createProductReview = async (req, res) => {
  const { product_id, content, rating, name, email } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO reviews(name, email, product_id, content, rating) 
       VALUES($1, $2, $3, $4, $5) returning *
      `,
      [name, email, product_id, content, rating]
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const updateProductReview = async (req, res) => {
  const { content, rating, id } = req.body;
  // Delete this function later, there's no need for it ❌
  try {
    const result = await pool.query(
      `UPDATE reviews set content = $1, rating = $2 where id = $3 returning *
      `,
      [content, rating, id]
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json(error);
  }
};

const addPrimaryImage = async (req, res) => {
  try {
    const image_url = req.imageNames[0];
    const { id: product_id } = req.params;
    const addedImage = await productService.addPrimaryProductImage({
      image_url,
      product_id,
    });
    res.status(200).json(addedImage);
  } catch (error) {
    throw new ErrorHandler(error.statusCode, error.message);
    // res.status(500).json(error);
  }
};

const updatePrimaryImage = async (req, res) => {
  const { image_id } = req.body;
  const image_url = req.imageNames[0];

  try {
    const updatedImage = await productService.updatePrimaryImage({
      image_url,
      image_id,
    });
    res.status(200).json(updatedImage);
  } catch (error) {
    throw new ErrorHandler(error.statusCode, error.message);
    // res.status(500).json(error);
  }
};

// secondary images
const addSecondaryImage = async (req, res) => {
  try {
    const image_url = req.imageNames[0];
    const { id: product_id } = req.params;
    const addedImage = await productService.addSecondaryProductImage({
      image_url,
      product_id,
    });
    res.status(200).json(addedImage);
  } catch (error) {
    throw new ErrorHandler(error.statusCode, error.message);
    // res.status(500).json(error);
  }
};

const updateSecondaryImage = async (req, res) => {
  const { image_id } = req.body;
  const image_url = req.imageNames[0];

  try {
    const updatedImage = await productService.updateSecondaryImage({
      image_url,
      image_id,
    });
    res.status(200).json(updatedImage);
  } catch (error) {
    throw new ErrorHandler(error.statusCode, error.message);
    // res.status(500).json(error);
  }
};

const deleteSecondaryImage = async (req, res) => {
  const { image_id } = req.body;
  console.log(image_id);
  try {
    const deletedImage = await productService.deleteSecondaryImage({
      image_id,
    });
    console.log(deletedImage);
    if (!deletedImage) {
      return res.status(404).json({ message: "Image not found" });
    }
    res.status(200).json(image_id);
  } catch (error) {
    throw new ErrorHandler(error.statusCode, error.message);
    res.status(500).json(error);
  }
};

const searchProduct = async (req, res) => {
  const { searchTerm } = req.params;
  try {
    const searchResult = await productService.searchProduct({ searchTerm });
    res.status(200).json(searchResult);
  } catch (error) {
    throw new ErrorHandler(error.statusCode, error.message);
  }
};

const addProductTag = async (req, res) => {
  const { product_id, tag } = req.body;
  console.log(product_id, tag);
  try {
    const addedTag = await productService.addProductTag({
      product_id,
      tag,
    });
    res.status(201).json(addedTag);
  } catch (error) {
    throw new ErrorHandler(error.statusCode, error.message);
    res.status(500).json(error.message);
  }
};

const updateProductTag = async (req, res) => {
  const { tag, tag_id } = req.body;
  try {
    const updatedTag = await productService.updateProductTag({
      tag,
      tag_id,
    });
    res.status(200).json(updatedTag);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const deleteProductTag = async (req, res) => {
  const { tag_id } = req.body;
  console.log(tag_id);
  try {
    const deletedTag = await productService.deleteProductTag({
      tag_id,
    });
    res.status(200).json(deletedTag);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

module.exports = {
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getAllProducts,
  getProductReviews,
  updateProductReview,
  createProductReview,
  addPrimaryImage,
  updatePrimaryImage,
  addSecondaryImage,
  updateSecondaryImage,
  deleteSecondaryImage,
  searchProduct,
  addProductTag,
  updateProductTag,
  deleteProductTag,
};
