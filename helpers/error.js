class ErrorHandler extends Error {
  constructor(statusCode, message) {
    super(message);
    this.status = "error";
    this.statusCode = statusCode;
    this.message = message;
  }
}

const handleError = (err, req, res, next) => {
  const { statusCode, message } = err;
  console.error(err);
  res.status(statusCode || 500).json({
    status: "error",
    statusCode: statusCode || 500,
    message: statusCode === 500 ? "An error occured!" : message,
  });
  next();
};
module.exports = { ErrorHandler, handleError };
