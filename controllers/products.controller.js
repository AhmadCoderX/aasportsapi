const pool = require("../config/db");
const { ErrorHandler } = require("../helpers/error");
const productService = require("../services/products.service");
const fs = require("fs");
const path = require("path");

const getAllProducts = async (req, res) => {
  try {
    const products = await productService.getAllProducts();
    res.json(products);
  } catch {
    res.status(500).json(error);
  }
};

const createProduct = async (req, res) => {
  try {
    const { name, description, category_id, sku, type } = req.body;
    const newProduct = await productService.addProduct({
      name,
      description,
      category_id,
      sku,
      type,
    });
    res.status(200).json(newProduct);
  } catch {
    res.status(500).json(error);
  }
};

const getProduct = async (req, res) => {
  try {
    const product = await productService.getProductById(req.params);
    res.status(200).json(product);
  } catch {
    res.status(500).json(error);
  }
};

const updateProduct = async (req, res) => {
  try {
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
  } catch {
    res.status(500).json(error);
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await productService.removeProduct({ id });
    res.status(200).json(deletedProduct);
  } catch {
    res.status(500).json(error);
  }
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
    res.status(500).json(error);

    // throw new ErrorHandler(error.statusCode, error.message);
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

const deleteProductReview = async (req, res) => {
  const { id } = req.body;
  try {
    const { rows: review } = await pool.query(
      `DELETE FROM reviews WHERE id = $1 RETURNING *`,
      [id]
    );
    res.json(review[0]);
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
    // throw new ErrorHandler(error.statusCode, error.message);
    res.status(500).json(error);
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
    // throw new ErrorHandler(error.statusCode, error.message);
    res.status(500).json(error);
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
    // throw new ErrorHandler(error.statusCode, error.message);
    res.status(500).json(error);
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
    // throw new ErrorHandler(error.statusCode, error.message);
    res.status(500).json(error);
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

    const imagePath = path.join(
      __dirname,
      "../uploads",
      deletedImage.image_url
    ); // Adjust the path to your uploads directory
    fs.unlinkSync(imagePath);

    res.status(200).json(deletedImage);
  } catch (error) {
    // throw new ErrorHandler(error.statusCode, error.message);
    res.status(500).json(error);
  }
};

const searchProduct = async (req, res) => {
  const { searchTerm } = req.params;
  try {
    const searchResult = await productService.searchProduct({ searchTerm });
    res.status(200).json(searchResult);
  } catch (error) {
    // throw new ErrorHandler(error.statusCode, error.message);

    res.status(500).json(error);
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
    // throw new ErrorHandler(error.statusCode, error.message);
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
  createProductReview,
  deleteProductReview,
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
