const { ErrorHandler } = require("../helpers/error");

const unknownEndpoint = (req, res) => {
  throw new ErrorHandler(401, "Unknown Endpoint");
};

module.exports = unknownEndpoint;
