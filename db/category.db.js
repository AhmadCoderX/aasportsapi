const pool = require("../config/db");

const getParentCategoriesDb = async () => {
  const { rows: categories } = await pool.query(
    "SELECT category.*, subcat_count FROM category LEFT JOIN ( SELECT parent_category_id, COUNT(*) AS subcat_count FROM category GROUP BY parent_category_id ) subcat_counts ON subcat_counts.parent_category_id = category.id WHERE category.parent_category_id IS NULL"
  );
  return categories;
};

const getSubcategoriesDb = async ({ parent_id }) => {
  const { rows: subcategories } = await pool.query(
    "SELECT * FROM category WHERE parent_category_id = $1",
    [parent_id]
  );
  return subcategories;
};

const createCategoryDb = async ({
  category_name,
  category_desc,
  parent_id,
}) => {
  const { rows: newCategory } = await pool.query(
    "INSERT INTO category(name, description, parent_category_id) VALUES ($1, $2, $3) RETURNING *",
    [category_name, category_desc, parent_id]
  );
  return newCategory[0];
};

const updateCategoryDb = async ({ new_name, id, description }) => {
  const { rows: updatedCategory } = await pool.query(
    "UPDATE category SET name = $1, description = $2 WHERE id = $3 RETURNING *",
    [new_name, description, id]
  );
  return updatedCategory[0];
};

const getCategoryProductsDb = async ({ id }) => {
  const { rows: category } = await pool.query(
    "SELECT category.*, product_count, products.all_products FROM category LEFT JOIN (SELECT category_id, COUNT(*) AS product_count FROM product GROUP BY category_id) product_counts ON product_counts.category_id = category.id LEFT JOIN (SELECT category_id, json_agg(product.*) AS all_products FROM product GROUP BY category_id) products ON products.category_id = category.id WHERE category.id = $1",
    [id]
  );
  return category;
};

module.exports = {
  getParentCategoriesDb,
  getSubcategoriesDb,
  createCategoryDb,
  updateCategoryDb,
  getCategoryProductsDb,
};
