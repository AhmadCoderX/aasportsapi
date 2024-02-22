const pool = require("../config/db");

const getAllCategoriesDb = async () => {
  const { rows: categories } = await pool.query("SELECT * FROM category");
  return categories;
};

const createCategoryDb = async ({ category_name }) => {
  const { rows: newCategory } = await pool.query(
    "INSERT INTO category(name) VALUES ($1) RETURNING *",
    [category_name]
  );
  return newCategory[0];
};

const changeCategoryNameDb = async ({ category_new_name, id }) => {
  const { rows: updatedCategory } = await pool.query(
    "UPDATE category SET name = $1 WHERE id = $2 RETURNING *",
    [category_new_name, id]
  );
  return updatedCategory[0];
};

const getCategoryById = async ({ id }) => {
  const { rows: category } = await pool.query(
    "SELECT category.id, category.name, product_count, products.json_agg FROM category LEFT JOIN (SELECT category_id, COUNT(*) AS product_count FROM product GROUP BY category_id) product_counts ON product_counts.category_id = category.id LEFT JOIN (SELECT category_id, json_agg(product.*) AS json_agg FROM product GROUP BY category_id) products ON products.category_id = category.id WHERE category.id = $1",
    [id]
  );
  return category;
};

module.exports = {
  getAllCategoriesDb,
  createCategoryDb,
  changeCategoryNameDb,
  getCategoryById,
};
