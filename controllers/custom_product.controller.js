const { ErrorHandler } = require("../helpers/error");
const customService = require("../services/custom_product.service");

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
    const { custom_product_id, title, src } = req.body;
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
      id,
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
      id,
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
      id,
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
      id,
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

module.exports = {
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
};
