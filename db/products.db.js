const pool = require("../config/db");

const getAllProductsDb = async () => {
  const { rows } = await pool.query(
    "WITH product_reviews AS ( SELECT p.*, JSON_ARRAYAGG(r.*) AS reviews FROM product p LEFT JOIN reviews r ON p.id = r.product_id GROUP BY p.id ) SELECT p.*, c.name AS category_name, (SELECT JSON_ARRAYAGG(img.*) FROM product_images img WHERE img.product_id = p.id) AS product_images, (SELECT JSON_ARRAYAGG(tags.*) FROM product_tags tags WHERE tags.product_id = p.id) AS tags FROM product p LEFT JOIN category c ON c.id = p.category_id;"
  );
  const products = rows;
  return products;
};

const createProductDb = async ({
  name,
  description,
  category_id,
  sku,
  type,
}) => {
  const { rows: product } = await pool.query(
    "INSERT INTO product(name, description, category_id, sku, type) VALUES($1, $2, $3, $4, $5) RETURNING *",
    [name, description, category_id, sku, type]
  );
  return product[0];
};

const getProductDb = async ({ id }) => {
  const { rows: product } = await pool.query(
    "SELECT p.*, c.name AS category_name, (SELECT JSON_ARRAYAGG(img.*) FROM product_images img WHERE img.product_id = p.id) AS product_images, (SELECT JSON_ARRAYAGG(r.*) FROM reviews r WHERE r.product_id = p.id) AS reviews, (SELECT JSON_ARRAYAGG(tags.*) FROM product_tags tags WHERE tags.product_id = p.id) AS tags FROM product p LEFT JOIN category c ON c.id = p.category_id WHERE p.id = $1",
    [id]
  );
  return product[0];
};

const updateProductDb = async ({
  name,
  description,
  category_id,
  sku,
  id,
  type,
}) => {
  const { rows: product } = await pool.query(
    "UPDATE product set name = $1, description = $2, category_id = $3, sku = $4, type = $5 WHERE product.id = $6 RETURNING *",
    [name, description, category_id, sku, type, id]
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

const searchProductDb = async ({ searchTerm }) => {
  const query = `
    SELECT p.*, JSON_ARRAYAGG(img.*) AS product_images FROM product p LEFT JOIN product_images img ON p.id = img.product_id WHERE p.name ILIKE $1 OR p.description ILIKE $1 OR p.sku ILIKE $1 GROUP BY p.id`;

  const { rows: product } = await pool.query(query, [`%${searchTerm}%`]);
  return product;
};

// Product Tags CRUD DB FUNCTIONS
const addProductTagDb = async ({ product_id, tag }) => {
  const { rows: addedTag } = await pool.query(
    "INSERT INTO product_tags (product_id, tag) VALUES($1, $2) RETURNING *",
    [product_id, tag]
  );
  return addedTag[0];
};

const updateProductTagDb = async ({ tag, tag_id }) => {
  const { rows: updatedTag } = await pool.query(
    "UPDATE product_tags SET tag = $1 WHERE id = $2 RETURNING *",
    [tag, tag_id]
  );
  return updatedTag[0];
};

const deleteProductTagDb = async ({ tag_id }) => {
  const { rows: deletedTag } = await pool.query(
    "DELETE FROM product_tags WHERE id = $1 RETURNING *",
    [tag_id]
  );
  return deletedTag[0];
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
  searchProductDb,
  addProductTagDb,
  updateProductTagDb,
  deleteProductTagDb,
};
