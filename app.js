const express = require("express");
const pool = require("./database/db");

const app = express();
const PORT = 8000;

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/about", (req, res) => {
  res.send("About route 🎉 ");
});

app.get("/product", async (req, res) => {
  const product = await pool.query(
    "Select * from product Where name = 'Baseball Uniform for Women';"
  );
  res.json(product.rows[0]);
});

app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
