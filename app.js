const express = require("express");
const pool = require("./config/db");
const routes = require("./routes");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const helmet = require("helmet");
const compression = require("compression");
const { handleError } = require("./helpers/error");

const app = express();

app.set("trust proxy", 1);
app.use(express.json());
app.use(cors({ credentials: true, origin: true }));
app.use(cookieParser());
app.use(morgan("dev"));
app.use(compression());
app.use(helmet());

app.get("/", (req, res) => {
  res.send("AA SPORTS API BY AHMAD");
});

app.use("/", routes);

app.use(handleError);

module.exports = app;
