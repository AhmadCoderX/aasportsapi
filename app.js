const express = require("express");
const pool = require("./config/db");
const routes = require("./routes");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const compression = require("compression");
const { handleError } = require("./helpers/error");

const app = express();

app.set("trust proxy", 1);
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(morgan("dev"));
app.use(compression());
app.use("/uploads", express.static("uploads"));

app.get("/", (req, res) => {
  res.send("AA SPORTS API BY AHMAD");
});

app.use(routes);

app.use(handleError);

module.exports = app;
