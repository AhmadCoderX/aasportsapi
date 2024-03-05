const pool = require("../config/db");

const getAllCustomProductsDb = async () => {
  const { rows: product } = await pool.query("select * from custom_product");
  return product;
};

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
    "UPDATE c_front_objects SET title = $1, type = $2, path = $3, color = $4 WHERE id = $5 RETURNING *",
    [title, type, path, color, id]
  );
  return updatedPath;
};

const deleteFrontPathDb = async ({ front_object_id }) => {
  const { rows: deletedPath } = await pool.query(
    "DELETE FROM c_front_objects WHERE id = $1 RETURNING *",
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
    "UPDATE c_back_objects SET title = $1, type = $2, path = $3, color = $4 WHERE id = $5 RETURNING *",
    [title, type, path, color, id]
  );
  return updatedPath;
};

const deleteBackPathDb = async ({ back_object_id }) => {
  const { rows: deletedPath } = await pool.query(
    "DELETE FROM c_back_objects WHERE id = $1 RETURNING *",
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
  front_text_id,
}) => {
  const { rows: updatedText } = await pool.query(
    "UPDATE c_front_text SET y = $1,  x=$2,  title=$3,  text=$4,  strokeWidth=$5,  fontSize=$6,  draggable=$7,  align=$8,  width=$9,  height=$10,  fill=$11,  stroke=$12,  fontFamily=$13 WHERE id=$14 RETURNING *",
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
      front_text_id,
    ]
  );
  return updatedText;
};

const deleteFrontTextDb = async ({ front_text_id }) => {
  const { rows: deletedText } = await pool.query(
    "DELETE FROM c_front_text WHERE id = $1 RETURNING *",
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
  back_text_id,
}) => {
  const { rows: updatedText } = await pool.query(
    "UPDATE c_back_text SET y = $1,  x=$2,  title=$3,  text=$4,  strokeWidth=$5,  fontSize=$6,  draggable=$7,  align=$8,  width=$9,  height=$10,  fill=$11,  stroke=$12,  fontFamily = $13 WHERE id = $14 RETURNING *",
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
      back_text_id,
    ]
  );
  return updatedText;
};

const deleteBackTextDb = async ({ back_text_id }) => {
  const { rows: deletedText } = await pool.query(
    "DELETE FROM c_back_text WHERE id = $1 RETURNING *",
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

const deleteFrontMaskImageDb = async ({ custom_product_id }) => {
  const { rows: deletedImage } = await pool.query(
    "DELETE FROM front_mask_image WHERE custom_product_id = $1 RETURNING *",
    [custom_product_id]
  );
  if (deletedImage && deletedImage.length > 0) {
    return deletedImage[0];
  } else {
    throw new Error("No rows deleted. Custom product not found.");
  }
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

const deleteBackMaskImageDb = async ({ custom_product_id }) => {
  const { rows: deletedImage } = await pool.query(
    "DELETE FROM back_mask_image WHERE custom_product_id = $1 RETURNING *",
    [custom_product_id]
  );
  if (deletedImage && deletedImage.length > 0) {
    return deletedImage[0];
  } else {
    throw new Error("No rows deleted. Custom product not found.");
  }
};

const getCustomProductDb = async ({ c_id }) => {
  const { rows: customProduct } = await pool.query(
    "SELECT cp.product_name AS name, ( SELECT jsonb_build_object( 'title', 'frontMaskImage', 'type', 'image', 'src', fmi.src ) FROM front_mask_image fmi WHERE fmi.custom_product_id = cp.c_id LIMIT 1 ) AS frontMaskImage, ( SELECT jsonb_build_object( 'title', 'backMaskImage', 'type', 'image', 'src', bmi.src ) FROM back_mask_image bmi WHERE bmi.custom_product_id = cp.c_id LIMIT 1 ) AS backMaskImage, ( SELECT jsonb_agg( jsonb_build_object( 'title', fo.title, 'type', fo.type, 'path', fo.path, 'color', fo.color, 'id', fo.id )) FROM c_front_objects fo WHERE fo.custom_product_id = cp.c_id ) AS frontObjects,(SELECT jsonb_agg( jsonb_build_object( 'title', bo.title, 'type', bo.type, 'path', bo.path, 'color', bo.color, 'id', bo.id )) FROM c_back_objects bo WHERE bo.custom_product_id = cp.c_id ) AS backObjects, ( SELECT jsonb_agg( jsonb_build_object( 'y', ft.y, 'x', ft.x, 'title', ft.title, 'text', ft.text, 'strokeWidth', ft.strokeWidth, 'fontSize', ft.fontSize, 'draggable', ft.draggable, 'align', ft.align, 'width', ft.width, 'height', ft.height, 'fill', ft.fill, 'stroke', ft.stroke, 'fontFamily', ft.fontFamily, 'id', ft.id )) FROM c_front_text ft WHERE ft.custom_product_id = cp.c_id ) AS frontText, ( SELECT jsonb_agg( jsonb_build_object( 'y', bt.y, 'x', bt.x, 'title', bt.title, 'text', bt.text, 'strokeWidth', bt.strokeWidth, 'fontSize', bt.fontSize, 'draggable', bt.draggable, 'align', bt.align, 'width', bt.width, 'height', bt.height, 'fill', bt.fill, 'stroke', bt.stroke, 'fontFamily', bt.fontFamily, 'id', bt.id )) FROM c_back_text bt WHERE bt.custom_product_id = cp.c_id ) AS backText FROM custom_product cp WHERE cp.c_id = $1",
    [c_id]
  );
  return customProduct[0];
};

const createUserCustomProductDb = async ({
  customer_id,
  custom_product_id,
  user_product,
}) => {
  const { rows: userCustomProduct } = await pool.query(
    "INSERT INTO user_custom_product(user_id, custom_product_id, user_product) VALUES ($1, $2, $3) RETURNING *",
    [customer_id, custom_product_id, user_product]
  );
  return userCustomProduct[0];
};

const getUserCustomProductDb = async ({ user_custom_product_id }) => {
  const { rows: userCustomProduct } = await pool.query(
    "SELECT * FROM user_custom_product WHERE id = $1",
    [user_custom_product_id]
  );
  return userCustomProduct[0];
};

const updateUserCustomProductDb = async ({
  user_custom_product_id,
  new_user_custom_product,
}) => {
  const { rows: updatedUserCustomProduct } = await pool.query(
    "UPDATE user_custom_product SET user_product = $1 WHERE id = $2 RETURNING *",
    [new_user_custom_product, user_custom_product_id]
  );
  return updatedUserCustomProduct;
};

const deleteUserCustomProductDb = async ({ user_custom_product_id }) => {
  const { rows: deletedUserCustomProduct } = await pool.query(
    "DELETE FROM user_custom_product WHERE id = $1 RETURNING *",
    [user_custom_product_id]
  );
  return deletedUserCustomProduct;
};

const getAllUserCustomProductDb = async ({ customer_id }) => {
  const { rows: userCustomProduct } = await pool.query(
    "SELECT * FROM user_custom_product WHERE user_id = $1",
    [customer_id]
  );
  return userCustomProduct;
};

module.exports = {
  getAllCustomProductsDb,
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
  getCustomProductDb,
  createUserCustomProductDb,
  getUserCustomProductDb,
  updateUserCustomProductDb,
  deleteUserCustomProductDb,
  getAllUserCustomProductDb,
};
