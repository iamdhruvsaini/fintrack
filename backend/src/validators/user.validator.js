const { StatusCodes } = require("http-status-codes");
const { sendError } = require("../utils");

const parseUserId = (id) => {
  const parsed = Number(id);

  if (!Number.isInteger(parsed) || parsed <= 0) {
    throw sendError("Invalid user id", StatusCodes.BAD_REQUEST, "VALIDATION_ERROR");
  }

  return parsed;
};

const validateChangeUserRoleBody = (body) => {
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    throw sendError("Request body is required", StatusCodes.BAD_REQUEST, "VALIDATION_ERROR");
  }

  const { roleName } = body;

  if (roleName === undefined) {
    throw sendError("Role name is required", StatusCodes.BAD_REQUEST, "VALIDATION_ERROR");
  }

  if (typeof roleName !== "string") {
    throw sendError("Role name must be a string", StatusCodes.BAD_REQUEST, "VALIDATION_ERROR");
  }

  if (!roleName.trim()) {
    throw sendError("Role name cannot be empty", StatusCodes.BAD_REQUEST, "VALIDATION_ERROR");
  }
};

module.exports = {
  parseUserId,
  validateChangeUserRoleBody,
};