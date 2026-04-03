const { StatusCodes } = require("http-status-codes");

const sendError = (
  message,
  statusCode = StatusCodes.INTERNAL_SERVER_ERROR,
  errorCode = "INTERNAL_SERVER_ERROR",
  details = null
) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  error.code = errorCode;
  error.details = details;
  return error;
};

module.exports = sendError;