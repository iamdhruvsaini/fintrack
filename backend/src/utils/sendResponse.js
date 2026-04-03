const { StatusCodes } = require("http-status-codes");

const sendResponse = (
  res,
  {
    success = true,
    message = "Request successful",
    data = null,
    statusCode = StatusCodes.OK,
    errorCode = null,
  }
) => {
  const payload = {
    success,
    message,
    statusCode,
    timestamp: new Date().toISOString(),
  };

  if (data !== null) {
    payload.data = data;
  }

  if (errorCode) {
    payload.errorCode = errorCode;
  }

  return res.status(statusCode).json(payload);
};

module.exports = sendResponse;