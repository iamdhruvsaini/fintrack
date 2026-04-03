const { StatusCodes } = require("http-status-codes");
const { sendResponse } = require("../utils");

module.exports = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }

  return sendResponse(res, {
    success: false,
    message: "Unauthorized",
    statusCode: StatusCodes.UNAUTHORIZED,
    errorCode: "UNAUTHORIZED",
  });
};