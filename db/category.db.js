const pool = require("../config/db");

const getAllCategoriesDb = async () => {
  const { rows: categories } = await pool.query(
    "SELECT category.*, subcat_count FROM category LEFT JOIN ( SELECT parent_category_id, COUNT(*) AS subcat_count FROM category GROUP BY parent_category_id ) subcat_counts ON subcat_counts.parent_category_id = category.id "
  );
  return categories;
};

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

const updateCategoryDb = async ({ new_name, id, description, parent_id }) => {
  const { rows: updatedCategory } = await pool.query(
    "UPDATE category SET name = $1, description = $2, parent_category_id = $3 WHERE id = $4 RETURNING *",
    [new_name, description, parent_id, id]
  );
  return updatedCategory[0];
};

const deleteCategoryDb = async ({ id }) => {
  const { rows: deletedCategory } = await pool.query(
    "DELETE FROM category WHERE id = $1 RETURNING *",
    [id]
  );
  return deletedCategory[0];
};

const getCategoryProductsDb = async ({ id }) => {
  const { rows: category } = await pool.query(
    "SELECT category.*, product_count, products.all_products FROM category LEFT JOIN (SELECT category_id, COUNT(*) AS product_count FROM product GROUP BY category_id) product_counts ON product_counts.category_id = category.id LEFT JOIN (SELECT category_id, json_agg(product.*) AS all_products FROM product GROUP BY category_id) products ON products.category_id = category.id WHERE category.id = $1",
    [id]
  );
  return category;
};

const addCategoryImageDb = async ({ image_url, category_id }) => {
  const { rows: category } = await pool.query(
    "UPDATE category SET category_img_url = $1 WHERE id = $2 RETURNING *",
    [image_url, category_id]
  );
  return category;
};

module.exports = {
  getAllCategoriesDb,
  getParentCategoriesDb,
  getSubcategoriesDb,
  createCategoryDb,
  updateCategoryDb,
  deleteCategoryDb,
  getCategoryProductsDb,
  addCategoryImageDb,
};
