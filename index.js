require("dotenv").config({ path: __dirname + "/.env" });
const http = require("http");
const app = require("./app");
// const { logger } = require("./utils/logger");

const server = http.createServer(app);

const PORT = process.env.PORT || 8080;

server.listen(PORT, () =>
  console.info(`🔥Magic happening on port: ${PORT} 🔥`)
);
