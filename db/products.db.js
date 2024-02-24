const pool = require("../config/db");

const getAllProductsDb = async () => {
  const { rows } = await pool.query("select * from product");
  const product = rows;
  return product;
};

const createProductDb = async ({
  name,
  description,
  product_image_url,
  category_id,
  sku,
}) => {
  const { rows: product } = await pool.query(
    "INSERT INTO product(name, description, product_image_url, category_id, sku) VALUES($1, $2, $3, $4, $5) RETURNING *",
    [name, description, product_image_url, category_id, sku]
  );
  return product[0];
};

const getProductDb = async ({ id }) => {
  const { rows: product } = await pool.query(
    "SELECT * FROM product WHERE product.id = $1",
    [id]
  );
  return product[0];
};

const updateProductDb = async ({
  name,
  description,
  product_image_url,
  category_id,
  id,
  sku,
}) => {
  const { rows: product } = await pool.query(
    "UPDATE product set name = $1, description = $2, product_image_url = $3, category_id = $4, sku = $5 WHERE product.id = $5 RETURNING *",
    [name, description, product_image_url, category_id, id, sku]
  );
  return product[0];
};

const deleteProductDb = async ({ id }) => {
  const { rows } = await pool.query(
    "DELETE FROM product WHERE product.id = $1 RETURNING *",
    [id]
  );
  return rows[0];
};

const addPrimaryImageDb = async ({ image_url, product_id }) => {
  const { rows: imageUrl } = await pool.query(
    "INSERT INTO product_images(product_id, image_url, type) VALUES($1, $2, 'primary') RETURNING *",
    [product_id, image_url]
  );
  return imageUrl[0];
};

const updatePrimaryImageDb = async ({ image_url, image_id }) => {
  const { rows: primaryImage } = await pool.query(
    "UPDATE product_images SET image_url = $1 WHERE id = $2 RETURNING *",
    [image_url, image_id]
  );
  return primaryImage[0];
};

const addSecondaryImageDb = async ({ image_url, product_id }) => {
  const { rows: secondaryImage } = await pool.query(
    "INSERT INTO product_images(product_id, image_url, type) VALUES($1, $2, 'secondary') RETURNING *",
    [product_id, image_url]
  );
  return secondaryImage[0];
};

const updateSecondaryImageDb = async ({ image_url, image_id }) => {
  const { rows: secondaryImage } = await pool.query(
    "UPDATE product_images SET image_url = $1 WHERE id = $2 RETURNING *",
    [image_url, image_id]
  );
  return secondaryImage[0];
};

const deleteSecondaryImageDb = async ({ image_id }) => {
  const { rows: deletedImage } = await pool.query(
    "DELETE FROM product_images WHERE id = $1 RETURNING *",
    [image_id]
  );
  return deletedImage[0];
};

const deleteAllImagesDb = async ({ product_id }) => {
  const { rows: deletedImages } = await pool.query(
    "DELETE FROM product_images WHERE product_id = $1 RETURNING *",
    [product_id]
  );
  return deletedImages;
};

module.exports = {
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
};
