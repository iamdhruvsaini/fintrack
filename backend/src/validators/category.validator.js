const { StatusCodes } = require("http-status-codes");
const { sendError } = require("../utils");

const ALLOWED_TYPES = new Set(["income", "expense"]);
const ALLOWED_STATUS = new Set(["active", "inactive"]);
const ALLOWED_MUTATION_FIELDS = ["name", "type", "status"];

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

const ensureValidCategoryType = (type) => {
  const normalizedType = String(type).trim().toLowerCase();

  if (!ALLOWED_TYPES.has(normalizedType)) {
    throw sendError("Invalid category type", StatusCodes.BAD_REQUEST, "VALIDATION_ERROR");
  }

  return normalizedType;
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

  const { name, type } = body;

  if (name === undefined || type === undefined) {
    throw sendError("Category name and type are required", StatusCodes.BAD_REQUEST, "VALIDATION_ERROR");
  }

  if (typeof name !== "string" || typeof type !== "string") {
    throw sendError("Category name and type must be strings", StatusCodes.BAD_REQUEST, "VALIDATION_ERROR");
  }
};

const validateUpdateCategoryBody = (body) => {
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    throw sendError("Request body is required", StatusCodes.BAD_REQUEST, "VALIDATION_ERROR");
  }

  const incomingFields = Object.keys(body);

  if (incomingFields.length === 0) {
    throw sendError(
      "At least one field (name, type, status) is required for update",
      StatusCodes.BAD_REQUEST,
      "VALIDATION_ERROR"
    );
  }

  const hasAllowedField = incomingFields.some((field) => ALLOWED_MUTATION_FIELDS.includes(field));
  const invalidFields = incomingFields.filter((field) => !ALLOWED_MUTATION_FIELDS.includes(field));

  if (!hasAllowedField) {
    throw sendError(
      "Invalid payload. Allowed fields: name, type, status",
      StatusCodes.BAD_REQUEST,
      "VALIDATION_ERROR"
    );
  }

  if (invalidFields.length > 0) {
    throw sendError(
      `Invalid field(s): ${invalidFields.join(", ")}. Allowed fields: name, type, status`,
      StatusCodes.BAD_REQUEST,
      "VALIDATION_ERROR"
    );
  }

  if (body.name !== undefined && typeof body.name !== "string") {
    throw sendError("Category name must be a string", StatusCodes.BAD_REQUEST, "VALIDATION_ERROR");
  }

  if (body.type !== undefined && typeof body.type !== "string") {
    throw sendError("Category type must be a string", StatusCodes.BAD_REQUEST, "VALIDATION_ERROR");
  }

  if (body.status !== undefined && typeof body.status !== "string") {
    throw sendError("Category status must be a string", StatusCodes.BAD_REQUEST, "VALIDATION_ERROR");
  }
};

module.exports = {
  normalizeCategoryName,
  parseCategoryId,
  ensureValidCategoryType,
  ensureValidCategoryStatus,
  validateCreateCategoryBody,
  validateUpdateCategoryBody,
};