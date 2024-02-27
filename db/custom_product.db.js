const pool = require("../config/db");

const createCustomProductDb = async ({ product_name, sku }) => {
  const { rows: createdProduct } = await pool.query(
    "INSERT INTO custom_product(product_name, sku) VALUES ($1, $2) RETURNING *",
    [product_name, sku]
  );
  return createdProduct;
};

const addFrontPathDb = async ({
  custom_product_id,
  title,
  type,
  path,
  color,
  id,
}) => {
  const { rows: addedPath } = await pool.query(
    "INSERT INTO c_front_objects(custom_product_id, title, type, path, color, id) VALUES($1, $2, $3, $4, $5, $6) RETURNING *",
    [custom_product_id, title, type, path, color, id]
  );
  return addedPath;
};

const updateFrontPathDb = async ({
  front_object_id,
  title,
  type,
  path,
  color,
  id,
}) => {
  const { rows: updatedPath } = await pool.query(
    "UPDATE c_front_objects SET title = $1, type = $2, path = $3, color = $4, id = $5 WHERE front_object_id = $6 RETURNING *",
    [title, type, path, color, id, front_object_id]
  );
  return updatedPath;
};

const deleteFrontPathDb = async ({ front_object_id }) => {
  const { rows: deletedPath } = await pool.query(
    "DELETE FROM c_front_objects WHERE front_object_id = $1 RETURNING *",
    [front_object_id]
  );
  return deletedPath;
};

const addBackPathDb = async ({
  custom_product_id,
  title,
  type,
  path,
  color,
  id,
}) => {
  const { rows: addedPath } = await pool.query(
    "INSERT INTO c_back_objects(custom_product_id, title, type, path, color, id) VALUES($1, $2, $3, $4, $5, $6) RETURNING *",
    [custom_product_id, title, type, path, color, id]
  );
  return addedPath;
};

const updateBackPathDb = async ({
  back_object_id,
  title,
  type,
  path,
  color,
  id,
}) => {
  const { rows: updatedPath } = await pool.query(
    "UPDATE c_back_objects SET title = $1, type = $2, path = $3, color = $4, id = $5 WHERE back_object_id = $6 RETURNING *",
    [title, type, path, color, id, back_object_id]
  );
  return updatedPath;
};

const deleteBackPathDb = async ({ back_object_id }) => {
  const { rows: deletedPath } = await pool.query(
    "DELETE FROM c_back_objects WHERE back_object_id = $1 RETURNING *",
    [back_object_id]
  );
  return deletedPath;
};

const AddFrontTextDb = async ({
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
}) => {
  const { rows: addedText } = await pool.query(
    "INSERT INTO c_front_text(custom_product_id, title, x, y, text, strokeWidth, fontSize, draggable, align, width, height, fill, stroke, fontFamily, id) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15) RETURNING * ",
    [
      custom_product_id,
      title,
      x,
      y,
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
    ]
  );
  return addedText;
};

const updateFrontTextDb = async ({
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
}) => {
  const { rows: updatedText } = await pool.query(
    "UPDATE c_front_text SET y = $1,  x=$2,  title=$3,  text=$4,  strokeWidth=$5,  fontSize=$6,  draggable=$7,  align=$8,  width=$9,  height=$10,  fill=$11,  stroke=$12,  fontFamily=$13,  id=$14 WHERE front_text_id = $15 RETURNING *",
    [
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
    ]
  );
  return updatedText;
};

const deleteFrontTextDb = async ({ front_text_id }) => {
  const { rows: deletedText } = await pool.query(
    "DELETE FROM c_front_text WHERE front_text_id = $1 RETURNING *",
    [front_text_id]
  );
  return deletedText;
};

const AddBackTextDb = async ({
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
}) => {
  const { rows: addedText } = await pool.query(
    "INSERT INTO c_back_text(custom_product_id, title, x, y, text, strokeWidth, fontSize, draggable, align, width, height, fill, stroke, fontFamily, id) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15) RETURNING * ",
    [
      custom_product_id,
      title,
      x,
      y,
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
    ]
  );
  return addedText;
};

const updateBackTextDb = async ({
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
}) => {
  const { rows: updatedText } = await pool.query(
    "UPDATE c_back_text SET y = $1,  x=$2,  title=$3,  text=$4,  strokeWidth=$5,  fontSize=$6,  draggable=$7,  align=$8,  width=$9,  height=$10,  fill=$11,  stroke=$12,  fontFamily=$13,  id=$14 WHERE back_text_id = $15 RETURNING *",
    [
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
    ]
  );
  return updatedText;
};

const deleteBackTextDb = async ({ back_text_id }) => {
  const { rows: deletedText } = await pool.query(
    "DELETE FROM c_back_text WHERE back_text_id = $1 RETURNING *",
    [back_text_id]
  );
  return deletedText;
};

const addFrontMaskImageDb = async ({ custom_product_id, title, src }) => {
  const { rows: addedImage } = await pool.query(
    "INSERT INTO front_mask_image(custom_product_id, title, src) VALUES ($1,$2,$3) RETURNING * ",
    [custom_product_id, title, src]
  );
  return addedImage[0];
};

const updateFrontMaskImageDb = async ({ title, src, id }) => {
  const { rows: updatedImage } = await pool.query(
    "UPDATE front_mask_image SET title = $1, src = $2 WHERE id = $3 RETURNING *",
    [title, src, id]
  );
  return updatedImage;
};

const deleteFrontMaskImageDb = async ({ id }) => {
  const { rows: deletedImage } = await pool.query(
    "DELETE FROM front_mask_image WHERE id = $1 RETURNING *",
    [id]
  );
  return deletedImage;
};

const addBackMaskImageDb = async ({ custom_product_id, title, src }) => {
  const { rows: addedImage } = await pool.query(
    "INSERT INTO back_mask_image(custom_product_id, title, src) VALUES ($1,$2,$3) RETURNING * ",
    [custom_product_id, title, src]
  );
  return addedImage[0];
};

const updateBackMaskImageDb = async ({ title, src, id }) => {
  const { rows: updatedImage } = await pool.query(
    "UPDATE back_mask_image SET title = $1, src = $2 WHERE id = $3 RETURNING *",
    [title, src, id]
  );
  return updatedImage;
};

const deleteBackMaskImageDb = async ({ id }) => {
  const { rows: deletedImage } = await pool.query(
    "DELETE FROM back_mask_image WHERE id = $1 RETURNING *",
    [id]
  );
  return deletedImage;
};

module.exports = {
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
};
