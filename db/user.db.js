const pool = require("../config/db");

const getAllUsersDb = async () => {
  const { rows: user } = await pool.query("select * from customer");
  return user;
};

const createUserDb = async ({ name, email, password }) => {
  const { rows: user } = await pool.query(
    "INSERT INTO customer(name, email, password) VALUES($1, $2, $3) RETURNING *",
    [name, email, password]
  );
  return user[0];
};

const getUserByIdDb = async (id) => {
  const { rows: user } = await pool.query(
    "SELECT customer.*, cart.id as cart_id FROM customer LEFT JOIN cart ON cart.customer_id = customer.id WHERE customer.id = $1",
    [id]
  );
  return user[0];
};
const getUserByEmailDb = async (email) => {
  const { rows: user } = await pool.query(
    "SELECT customer.*, cart.id as cart_id FROM customer LEFT JOIN cart ON cart.customer_id = customer.id WHERE customer.email = $1",
    [email]
  );
  return user[0];
};

const updateUserDb = async ({
  name,
  email,
  phone_number,
  address,
  city,
  state,
  zip_code,
  country,
}) => {
  const { rows: user } = await pool.query(
    "UPDATE customer SET name = $1, email = $2, phone_number = $3, address = $4, city = $5, state = $6, zip_code = $7, country = $8 RETURNING *",
    [name, email, phone_number, address, city, state, zip_code, country]
  );
  return user[0];
};

const deleteUserDb = async (id) => {
  const { rows: user } = await pool.query(
    "DELETE FROM customer WHERE id = $1 RETURNING *",
    [id]
  );
  return user[0];
};

const changeUserPasswordDb = async (hashedPassword, email) => {
  return await pool.query(
    "UPDATE customer set password = $1 WHERE email = $2",
    [hashedPassword, email]
  );
};

module.exports = {
  getAllUsersDb,
  getUserByIdDb,
  getUserByEmailDb,
  updateUserDb,
  createUserDb,
  deleteUserDb,
  changeUserPasswordDb,
};
