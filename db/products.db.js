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
}) => {
  const { rows: product } = await pool.query(
    "INSERT INTO product(name, description, product_image_url, category_id) VALUES($1, $2, $3, $4) RETURNING *",
    [name, description, product_image_url, category_id]
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
}) => {
  const { rows: product } = await pool.query(
    "UPDATE product set name = $1, description = $2, product_image_url = $3, category_id = $4 WHERE product.id = $5 RETURNING *",
    [name, description, product_image_url, category_id, id]
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

module.exports = {
  getProductDb,
  getAllProductsDb,
  createProductDb,
  updateProductDb,
  deleteProductDb,
};
