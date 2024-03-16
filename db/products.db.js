const pool = require("../config/db");

const getAllProductsDb = async () => {
  const { rows } = await pool.query(
    "WITH product_reviews AS ( SELECT p.*, JSON_ARRAYAGG(r.*) AS reviews FROM product p LEFT JOIN reviews r ON p.id = r.product_id GROUP BY p.id ) SELECT * FROM product_reviews;"
  );
  const product = rows;
  return product;
};

const createProductDb = async ({ name, description, category_id, sku }) => {
  const { rows: product } = await pool.query(
    "INSERT INTO product(name, description, category_id, sku) VALUES($1, $2, $3, $4) RETURNING *",
    [name, description, category_id, sku]
  );
  return product[0];
};

const getProductDb = async ({ id }) => {
  const { rows: product } = await pool.query(
    "SELECT p.*, JSON_ARRAYAGG(img.*) AS product_images FROM product p LEFT JOIN product_images img ON p.id = img.product_id WHERE p.id = $1 GROUP BY p.id",
    [id]
  );
  return product[0];
};

const updateProductDb = async ({ name, description, category_id, sku, id }) => {
  const { rows: product } = await pool.query(
    "UPDATE product set name = $1, description = $2, category_id = $3, sku = $4 WHERE product.id = $5 RETURNING *",
    [name, description, category_id, sku, id]
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
