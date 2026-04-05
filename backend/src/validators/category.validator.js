const { StatusCodes } = require("http-status-codes");
const { sendError } = require("../utils");

const ALLOWED_STATUS = new Set(["active", "inactive"]);
const ALLOWED_MUTATION_FIELDS = ["name", "description", "status"];

const normalizeCategoryName = (name) => {
  return String(name).trim().replace(/\s+/g, " ");
};

const parseCategoryId = (id) => {
  const parsed = Number(id);

  if (!Number.isInteger(parsed) || parsed <= 0) {
    throw sendError("Invalid category id", StatusCodes.BAD_REQUEST, "VALIDATION_ERROR");
  }

  return parsed;
};

const ensureValidCategoryStatus = (status) => {
  const normalizedStatus = String(status).trim().toLowerCase();

  if (!ALLOWED_STATUS.has(normalizedStatus)) {
    throw sendError("Invalid category status", StatusCodes.BAD_REQUEST, "VALIDATION_ERROR");
  }

  return normalizedStatus;
};

const validateCreateCategoryBody = (body) => {
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    throw sendError("Request body is required", StatusCodes.BAD_REQUEST, "VALIDATION_ERROR");
  }

  const { name, description, status } = body;

  if (name === undefined) {
    throw sendError("Category name is required", StatusCodes.BAD_REQUEST, "VALIDATION_ERROR");
  }

  if (typeof name !== "string") {
    throw sendError("Category name must be a string", StatusCodes.BAD_REQUEST, "VALIDATION_ERROR");
  }

  if (description !== undefined && typeof description !== "string") {
    throw sendError("Category description must be a string", StatusCodes.BAD_REQUEST, "VALIDATION_ERROR");
  }

  if (status !== undefined && typeof status !== "string") {
    throw sendError("Category status must be a string", StatusCodes.BAD_REQUEST, "VALIDATION_ERROR");
  }
};

const validateUpdateCategoryBody = (body) => {
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    throw sendError("Request body is required", StatusCodes.BAD_REQUEST, "VALIDATION_ERROR");
  }

  const incomingFields = Object.keys(body);

  if (incomingFields.length === 0) {
    throw sendError(
      "At least one field (name, description, status) is required for update",
      StatusCodes.BAD_REQUEST,
      "VALIDATION_ERROR"
    );
  }

  const invalidFields = incomingFields.filter((field) => !ALLOWED_MUTATION_FIELDS.includes(field));

  if (incomingFields.length === 0) {
    throw sendError(
      "At least one field (name, description, status) is required for update",
      StatusCodes.BAD_REQUEST,
      "VALIDATION_ERROR"
    );
  }

  if (incomingFields.length > 0 && invalidFields.length === incomingFields.length) {
    throw sendError(
      "Invalid payload. Allowed fields: name, description, status",
      StatusCodes.BAD_REQUEST,
      "VALIDATION_ERROR"
    );
  }

  if (invalidFields.length > 0) {
    throw sendError(
      `Invalid field(s): ${invalidFields.join(", ")}. Allowed fields: name, description, status`,
      StatusCodes.BAD_REQUEST,
      "VALIDATION_ERROR"
    );
  }

  if (body.name !== undefined && typeof body.name !== "string") {
    throw sendError("Category name must be a string", StatusCodes.BAD_REQUEST, "VALIDATION_ERROR");
  }

  if (body.description !== undefined && typeof body.description !== "string") {
    throw sendError("Category description must be a string", StatusCodes.BAD_REQUEST, "VALIDATION_ERROR");
  }

  if (body.status !== undefined && typeof body.status !== "string") {
    throw sendError("Category status must be a string", StatusCodes.BAD_REQUEST, "VALIDATION_ERROR");
  }
};

module.exports = {
  normalizeCategoryName,
  parseCategoryId,
  ensureValidCategoryStatus,
  validateCreateCategoryBody,
  validateUpdateCategoryBody,
};