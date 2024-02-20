const express = require("express");
const pool = require("./config/db");
const routes = require("./routes");
const cors = require("cors");

const app = express();
const PORT = 8000;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("AA SPORTS API");
});

app.use("/api", routes);

app.listen(PORT, () => {
  console.log(`💥 Server is running on port ${PORT} ✌️`);
});
