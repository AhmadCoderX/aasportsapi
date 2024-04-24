const path = require("path");
const fs = require("fs");
const { ErrorHandler } = require("../helpers/error");
const customService = require("../services/custom_product.service");
const pool = require("../config/db");

const getAllCustomProducts = async (req, res) => {
  try {
    const allProducts = await customService.getAllCustomProducts();
    res.status(200).json(allProducts);
  } catch (error) {
    res.status(500).json(error);
  }
};

const createCustomProduct = async (req, res) => {
  try {
    const { product_name, sku, category_id, simple_product_id } = req.body;

    const createdProduct = await customService.createCustomProduct({
      product_name,
      sku,
      category_id,
      simple_product_id,
    });

    console.log(createdProduct[0]);
    if (!createdProduct || !createdProduct[0].c_id) {
      return res.status(400).json({
        error: "Failed to create custom product or missing custom product ID.",
      });
    }

    const custom_product_id = createdProduct[0].c_id;

    const { rowCount, rows: updatedSimpleProduct } = await pool.query(
      "UPDATE product SET custom_product_id = $1 WHERE id = $2 RETURNING *",
      [custom_product_id, simple_product_id]
    );
    console.log(updatedSimpleProduct[0]);

    if (rowCount === 0) {
      return res
        .status(404)
        .json({ error: "Product not found or could not be updated." });
    }

    res.status(201).json(createdProduct);
  } catch (error) {
    console.error("Error creating custom product:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const updateCustomProduct = async (req, res) => {
  try {
    const { product_name, sku, category_id, simple_product_id } = req.body;
    const { c_id } = req.params;
    const updatedProduct = await customService.updateCustomProduct({
      product_name,
      sku,
      category_id,
      id: c_id,
      simple_product_id: simple_product_id,
    });

    const { rowCount, rows: updatedSimpleProduct } = await pool.query(
      "UPDATE product SET custom_product_id = $1 WHERE id = $2 RETURNING *",
      [c_id, simple_product_id]
    );
    console.log(updatedSimpleProduct[0]);

    if (rowCount === 0) {
      return res
        .status(404)
        .json({ error: "Product not found or could not be updated." });
    }
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json(error.message);
    // throw new ErrorHandler(error.statusCode, error.message);
  }
};

const deleteCustomProduct = async (req, res) => {
  try {
    const { c_id } = req.params;
    const deletedProduct = await customService.deleteCustomProduct({
      id: c_id,
    });
    res.status(200).json(deletedProduct);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const addFrontThumbImage = async (req, res) => {
  try {
    const { id } = req.params;
    const front_image_src = req.imageNames[0];
    const updatedProduct = await customService.addFrontThumbImage({
      id,
      front_image_src,
    });
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const addBackThumbImage = async (req, res) => {
  try {
    const { id } = req.params;
    const back_image_src = req.imageNames[0];
    const updatedProduct = await customService.addBackThumbImage({
      id,
      back_image_src,
    });
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const addFrontPath = async (req, res) => {
  try {
    const { custom_product_id, title, type, path, color, id } = req.body;
    const addedPath = await customService.addFrontPath({
      custom_product_id,
      title,
      type,
      path,
      color,
      id,
    });
    res.status(201).json(addedPath);
  } catch (error) {
    res.status(500).json(error);
  }
};

const addBackPath = async (req, res) => {
  try {
    const { custom_product_id, title, type, path, color, id } = req.body;
    const addedPath = await customService.addBackPath({
      custom_product_id,
      title,
      type,
      path,
      color,
      id,
    });
    res.status(201).json(addedPath);
  } catch (error) {
    res.status(500).json(error);
  }
};

const addFrontText = async (req, res) => {
  try {
    const {
      y,
      x,
      title,
      text,
      strokeWidth,
      fontSize,
      draggable,
      align,
      width,
      height,
      fill,
      stroke,
      fontFamily,
      id,
      custom_product_id,
    } = req.body;
    const addedTextObject = await customService.addFrontText({
      y,
      x,
      title,
      text,
      strokeWidth,
      fontSize,
      draggable,
      align,
      width,
      height,
      fill,
      stroke,
      fontFamily,
      id,
      custom_product_id,
    });
    res.status(201).json(addedTextObject);
  } catch (error) {
    res.status(500).json(error);
  }
};
const addBackText = async (req, res) => {
  try {
    const {
      y,
      x,
      title,
      text,
      strokeWidth,
      fontSize,
      draggable,
      align,
      width,
      height,
      fill,
      stroke,
      fontFamily,
      id,
      custom_product_id,
    } = req.body;
    const addedTextObject = await customService.addBackText({
      y,
      x,
      title,
      text,
      strokeWidth,
      fontSize,
      draggable,
      align,
      width,
      height,
      fill,
      stroke,
      fontFamily,
      id,
      custom_product_id,
    });
    res.status(201).json(addedTextObject);
  } catch (error) {
    res.status(500).json(error);
  }
};

const addFrontMaskImage = async (req, res) => {
  try {
    const { custom_product_id, title } = req.body;
    // Delete any existing mask images
    const deleteMaskImage = await pool.query(
      "DELETE FROM front_mask_image WHERE custom_product_id = $1",
      [custom_product_id]
    );
    const src = req.imageNames[0];
    const addedMaskImage = await customService.addFrontMaskImage({
      custom_product_id,
      title,
      src,
    });
    res.status(201).json(addedMaskImage);
  } catch (error) {
    res.status(500).json(error);
  }
};

const addBackMaskImage = async (req, res) => {
  try {
    const { custom_product_id, title } = req.body;
    // Delete any existing mask images
    const deleteMaskImage = await pool.query(
      "DELETE FROM back_mask_image WHERE custom_product_id = $1",
      [custom_product_id]
    );
    const src = req.imageNames[0];
    const addedMaskImage = await customService.addBackMaskImage({
      custom_product_id,
      title,
      src,
    });
    res.status(201).json(addedMaskImage);
  } catch (error) {
    res.status(500).json(error);
  }
};

const updateFrontPath = async (req, res) => {
  try {
    const { title, type, path, color, id } = req.body;
    const { front_object_id } = req.params;
    const updatedPath = await customService.updateFrontPath({
      front_object_id,
      title,
      type,
      path,
      color,
      id,
    });
    res.status(201).json(updatedPath);
  } catch (error) {
    res.status(500).json(error);

    // throw new ErrorHandler(error.statusCode, error.message);
  }
};

const deleteFrontPath = async (req, res) => {
  try {
    const { front_object_id } = req.params;
    const deletedPath = await customService.deleteFrontPath({
      front_object_id,
    });
    res.status(200).json(deletedPath);
  } catch (error) {
    res.status(500).json(error);
  }
};

const updateBackPath = async (req, res) => {
  try {
    const { title, type, path, color, id } = req.body;
    const { back_object_id } = req.params;
    const updatedPath = await customService.updateBackPath({
      back_object_id,
      title,
      type,
      path,
      color,
      id,
    });
    res.status(201).json(updatedPath);
  } catch (error) {
    res.status(500).json(error);
  }
};

const deleteBackPath = async (req, res) => {
  try {
    const { back_object_id } = req.params;
    const deletedPath = await customService.deleteBackPath({ back_object_id });
    res.status(200).json(deletedPath);
  } catch (error) {
    res.status(500).json(error);
  }
};

const updateFrontText = async (req, res) => {
  try {
    const {
      y,
      x,
      title,
      text,
      strokeWidth,
      fontSize,
      draggable,
      align,
      width,
      height,
      fill,
      stroke,
      fontFamily,
    } = req.body;
    const { front_text_id } = req.params;
    const updatedText = await customService.updateFrontText({
      y,
      x,
      title,
      text,
      strokeWidth,
      fontSize,
      draggable,
      align,
      width,
      height,
      fill,
      stroke,
      fontFamily,
      front_text_id,
    });
    res.status(201).json(updatedText);
  } catch (error) {
    res.status(500).json(error);
  }
};

const deleteFrontText = async (req, res) => {
  try {
    const { front_text_id } = req.params;
    const deletedText = await customService.deleteFrontText({ front_text_id });
    res.status(200).json(deletedText);
  } catch (error) {
    res.status(500).json(error);
  }
};

const updateBackText = async (req, res) => {
  try {
    const {
      y,
      x,
      title,
      text,
      strokeWidth,
      fontSize,
      draggable,
      align,
      width,
      height,
      fill,
      stroke,
      fontFamily,
    } = req.body;
    const { back_text_id } = req.params;
    const updatedText = await customService.updateBackText({
      y,
      x,
      title,
      text,
      strokeWidth,
      fontSize,
      draggable,
      align,
      width,
      height,
      fill,
      stroke,
      fontFamily,
      back_text_id,
    });
    res.status(201).json(updatedText);
  } catch (error) {
    res.status(500).json(error);
  }
};

const deleteBackText = async (req, res) => {
  try {
    const { back_text_id } = req.params;
    const deletedText = await customService.deleteBackText({ back_text_id });
    res.status(200).json(deletedText);
  } catch (error) {
    res.status(500).json(error);
  }
};

const updateFrontMaskImage = async (req, res) => {
  try {
    const { title, src } = req.body;
    const { id } = req.params;
    const updatedImage = await customService.updateFrontMaskImage({
      title,
      src,
      id,
    });
    res.status(201).json(updatedImage);
  } catch (error) {
    res.status(500).json(error);
  }
};

const deleteFrontMaskImage = async (req, res) => {
  try {
    const { custom_product_id } = req.body;
    const deletedImage = await customService.deleteFrontMaskImage({
      custom_product_id,
    });

    if (!deletedImage) {
      // Handle case where deletion failed or no image found
      return res.status(404).json({ message: "Mask image not found" });
    }
    console.log(deletedImage);
    const filePath = path.join(process.cwd(), "uploads", deletedImage?.src);
    fs.unlinkSync(filePath);

    res.status(200).json(deletedImage);
  } catch (error) {
    res.status(500).json(error);

    // throw new ErrorHandler(error.statusCode, error.message);
  }
};

const updateBackMaskImage = async (req, res) => {
  try {
    const { title, src } = req.body;
    const { id } = req.params;
    const updatedImage = await customService.updateBackMaskImage({
      title,
      src,
      id,
    });
    res.status(201).json(updatedImage);
  } catch (error) {
    res.status(500).json(error);
  }
};
const deleteBackMaskImage = async (req, res) => {
  try {
    const { custom_product_id } = req.body;
    const deletedImage = await customService.deleteBackMaskImage({
      custom_product_id,
    });

    if (!deletedImage) {
      // Handle case where deletion failed or no image found
      return res.status(404).json({ message: "Mask image not found" });
    }
    const filePath = path.join(process.cwd(), "uploads", deletedImage?.src);
    fs.unlinkSync(filePath);

    res.status(200).json(deletedImage);
  } catch (error) {
    // throw new ErrorHandler(error.statusCode, error.message);
    res.status(500).json(error);
  }
};

const getCustomProduct = async (req, res) => {
  try {
    const { c_id } = req.params;
    const product = await customService.getCustomProduct({ c_id });
    res.status(200).json(product);
  } catch (error) {
    // throw new ErrorHandler(error.statusCode, error.message);
    res.status(500).json(error);
  }
};

const createUserCustomProduct = async (req, res) => {
  try {
    const { customer_id, custom_product_id, user_product } = req.body;
    const createdProduct = await customService.createUserCustomProduct({
      customer_id,
      custom_product_id,
      user_product,
    });
    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(500).json(error);
  }
};

const updateUserCustomProduct = async (req, res) => {
  try {
    const { new_user_custom_product } = req.body;
    const { user_custom_product_id } = req.params;
    const updatedProduct = await customService.updateUserCustomProduct({
      user_custom_product_id,
      new_user_custom_product,
    });
    res.status(201).json(updatedProduct);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getUserCustomProduct = async (req, res) => {
  try {
    const { user_custom_product_id } = req.params;
    const product = await customService.getUserCustomProduct({
      user_custom_product_id,
    });
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json(error);
  }
};

const deleteUserCustomProduct = async (req, res) => {
  try {
    const { user_custom_product_id } = req.params;
    const deletedProduct = await customService.deleteUserCustomProduct({
      user_custom_product_id,
    });
    res.status(200).json(deletedProduct);
  } catch (error) {
    res.status(500).json(error);
    // throw new ErrorHandler(error.statusCode, error.message);
  }
};

const getALlUserCustomProduct = async (req, res) => {
  try {
    const { customer_id } = req.params;
    const products = await customService.getAllUserCustomProduct({
      customer_id,
    });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  getAllCustomProducts,
  createCustomProduct,
  updateCustomProduct,
  deleteCustomProduct,
  addFrontThumbImage,
  addBackThumbImage,
  addFrontPath,
  addBackPath,
  addFrontText,
  addBackText,
  addFrontMaskImage,
  addBackMaskImage,
  updateFrontPath,
  deleteFrontPath,
  updateBackPath,
  deleteBackPath,
  updateFrontText,
  deleteFrontText,
  updateBackText,
  deleteBackText,
  updateFrontMaskImage,
  deleteFrontMaskImage,
  updateBackMaskImage,
  deleteBackMaskImage,
  getCustomProduct,
  createUserCustomProduct,
  updateUserCustomProduct,
  getUserCustomProduct,
  deleteUserCustomProduct,
  getALlUserCustomProduct,
};
