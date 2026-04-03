// src/middlewares/role.middleware.js
const { StatusCodes } = require("http-status-codes");
const { sendResponse } = require("../utils");

const authorize = (roles) => {
  return (req, res, next) => {
    const userRole = req.user?.role?.name;

    if (!userRole || !roles.includes(userRole)) {
      return sendResponse(res, {
        success: false,
        message: "Forbidden",
        statusCode: StatusCodes.FORBIDDEN,
        errorCode: "FORBIDDEN",
      });
    }
    next();
  };
};

module.exports = authorize;