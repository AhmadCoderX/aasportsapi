const pool = require("../config/db");
const isValidTokenDb = async ({ token, email, curDate }) => {
  const { rows } = await pool.query(
    `SELECT EXISTS(select * from resetTokens WHERE token = $1 AND email = $2 AND expiration > $3 AND used = $4)`,
    [token, email, curDate, false]
  );
  return rows[0].exists;
};

const createResetTokenDb = async ({ email, expireDate, fpSalt }) => {
  await pool.query(
    "INSERT INTO resetTokens (email, expiration, token) VALUES ($1, $2, $3)",
    [email, expireDate, fpSalt]
  );
  return true;
};

const setTokenStatusDb = async (email) => {
  await pool.query("UPDATE resetTokens SET used = $1 WHERE email = $2", [
    true,
    email,
  ]);
  return true;
};

const deleteResetTokenDb = async (curDate) => {
  await pool.query("DELETE FROM resetTokens WHERE expiration <= $1", [curDate]);
  return true;
};

module.exports = {
  isValidTokenDb,
  createResetTokenDb,
  setTokenStatusDb,
  deleteResetTokenDb,
};
