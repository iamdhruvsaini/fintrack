const { StatusCodes } = require("http-status-codes");
const { sendError } = require("../utils");

const ensureObjectBody = (body) => {
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    throw sendError("Request body is required", StatusCodes.BAD_REQUEST, "VALIDATION_ERROR");
  }
};

const validateLoginBody = (body) => {
  ensureObjectBody(body);

  const { email, password } = body;

  if (email === undefined || password === undefined) {
    throw sendError("Email and password are required", StatusCodes.BAD_REQUEST, "VALIDATION_ERROR");
  }

  if (typeof email !== "string" || typeof password !== "string") {
    throw sendError("Email and password must be strings", StatusCodes.BAD_REQUEST, "VALIDATION_ERROR");
  }

  if (!email.trim() || !password.trim()) {
    throw sendError("Email and password cannot be empty", StatusCodes.BAD_REQUEST, "VALIDATION_ERROR");
  }
};

const validateRegisterBody = (body) => {
  ensureObjectBody(body);

  const { name, email, password, roleName } = body;

  if (name === undefined || email === undefined || password === undefined) {
    throw sendError("Name, email and password are required", StatusCodes.BAD_REQUEST, "VALIDATION_ERROR");
  }

  if (typeof name !== "string" || typeof email !== "string" || typeof password !== "string") {
    throw sendError("Name, email and password must be strings", StatusCodes.BAD_REQUEST, "VALIDATION_ERROR");
  }

  if (!name.trim() || !email.trim() || !password.trim()) {
    throw sendError("Name, email and password cannot be empty", StatusCodes.BAD_REQUEST, "VALIDATION_ERROR");
  }

  if (roleName !== undefined && typeof roleName !== "string") {
    throw sendError("Role name must be a string", StatusCodes.BAD_REQUEST, "VALIDATION_ERROR");
  }
};

module.exports = {
  validateLoginBody,
  validateRegisterBody,
};