const { ErrorHandler } = require("../helpers/error");
const customService = require("../services/custom_product.service");

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
    const { product_name, sku } = req.body;
    const createdProduct = await customService.createCustomProduct({
      product_name,
      sku,
    });
    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(500).json(error);
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
    const src = req.imageName;
    const imageUrl = `http://localhost:8000/uploads/${src}`;
    const addedMaskImage = await customService.addFrontMaskImage({
      custom_product_id,
      title,
      src: imageUrl,
    });
    res.status(201).json(addedMaskImage);
  } catch (error) {
    res.status(500).json(error);
  }
};

const addBackMaskImage = async (req, res) => {
  try {
    const { custom_product_id, title, src } = req.body;
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
    throw new ErrorHandler(error.statusCode, error.message);
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
    const { id } = req.params;
    const deletedImage = await customService.deleteFrontMaskImage({ id });
    res.status(200).json(deletedImage);
  } catch (error) {
    throw new ErrorHandler(error.statusCode, error.message);
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
    const { id } = req.params;
    const deletedImage = await customService.deleteBackMaskImage({ id });
    res.status(200).json(deletedImage);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getCustomProduct = async (req, res) => {
  try {
    const { c_id } = req.params;
    const product = await customService.getCustomProduct({ c_id });
    res.status(200).json(product);
  } catch (error) {
    throw new ErrorHandler(error.statusCode, error.message);
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
