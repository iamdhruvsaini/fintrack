const { StatusCodes } = require("http-status-codes");
const { sendError } = require("../utils");

const ALLOWED_RECORD_TYPES = new Set(["income", "expense"]);
const ALLOWED_RECORD_STATUS = new Set(["active", "inactive"]);
const ALLOWED_MUTATION_FIELDS = ["category_id", "categoryId", "amount", "type", "notes", "status"];

const parseFinancialRecordId = (id) => {
  const parsed = Number(id);

  if (!Number.isInteger(parsed) || parsed <= 0) {
    throw sendError("Invalid financial record id", StatusCodes.BAD_REQUEST, "VALIDATION_ERROR");
  }

  return parsed;
};

const parseCategoryId = (id) => {
  const parsed = Number(id);

  if (!Number.isInteger(parsed) || parsed <= 0) {
    throw sendError("Invalid category id", StatusCodes.BAD_REQUEST, "VALIDATION_ERROR");
  }

  return parsed;
};

const parseRecordAmount = (amount) => {
  const parsed = Number(amount);

  if (!Number.isFinite(parsed) || parsed <= 0) {
    throw sendError("Amount must be a valid positive number", StatusCodes.BAD_REQUEST, "VALIDATION_ERROR");
  }

  return parsed;
};

const ensureValidRecordType = (type) => {
  const normalizedType = String(type).trim().toLowerCase();

  if (!ALLOWED_RECORD_TYPES.has(normalizedType)) {
    throw sendError("Invalid record type", StatusCodes.BAD_REQUEST, "VALIDATION_ERROR");
  }

  return normalizedType;
};

const ensureValidRecordStatus = (status) => {
  const normalizedStatus = String(status).trim().toLowerCase();

  if (!ALLOWED_RECORD_STATUS.has(normalizedStatus)) {
    throw sendError("Invalid record status", StatusCodes.BAD_REQUEST, "VALIDATION_ERROR");
  }

  return normalizedStatus;
};

const normalizeNotes = (notes) => {
  if (notes === undefined || notes === null) {
    return null;
  }

  const normalized = String(notes).trim();
  return normalized || null;
};

const validateCreateFinancialRecordBody = (body) => {
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    throw sendError("Request body is required", StatusCodes.BAD_REQUEST, "VALIDATION_ERROR");
  }

  const { amount, type, notes, status } = body;
  const categoryIdValue = body.category_id ?? body.categoryId;

  if (categoryIdValue === undefined || amount === undefined || type === undefined) {
    throw sendError(
      "category_id/categoryId, amount and type are required",
      StatusCodes.BAD_REQUEST,
      "VALIDATION_ERROR"
    );
  }

  if (notes !== undefined && typeof notes !== "string") {
    throw sendError("Notes must be a string", StatusCodes.BAD_REQUEST, "VALIDATION_ERROR");
  }

  if (status !== undefined && typeof status !== "string") {
    throw sendError("Record status must be a string", StatusCodes.BAD_REQUEST, "VALIDATION_ERROR");
  }
};

const validateUpdateFinancialRecordBody = (body) => {
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    throw sendError("Request body is required", StatusCodes.BAD_REQUEST, "VALIDATION_ERROR");
  }

  const incomingFields = Object.keys(body);

  if (incomingFields.length === 0) {
    throw sendError(
      "At least one field (category_id/categoryId, amount, type, notes, status) is required for update",
      StatusCodes.BAD_REQUEST,
      "VALIDATION_ERROR"
    );
  }

  const invalidFields = incomingFields.filter((field) => !ALLOWED_MUTATION_FIELDS.includes(field));

  if (invalidFields.length > 0) {
    throw sendError(
      `Invalid field(s): ${invalidFields.join(", ")}. Allowed fields: category_id, categoryId, amount, type, notes, status`,
      StatusCodes.BAD_REQUEST,
      "VALIDATION_ERROR"
    );
  }

  if (body.notes !== undefined && body.notes !== null && typeof body.notes !== "string") {
    throw sendError("Notes must be a string", StatusCodes.BAD_REQUEST, "VALIDATION_ERROR");
  }

  if (body.status !== undefined && typeof body.status !== "string") {
    throw sendError("Record status must be a string", StatusCodes.BAD_REQUEST, "VALIDATION_ERROR");
  }
};

const validateGetFinancialRecordsQuery = (query) => {
  if (!query || typeof query !== "object" || Array.isArray(query)) {
    throw sendError("Invalid query parameters", StatusCodes.BAD_REQUEST, "VALIDATION_ERROR");
  }

  const numericQueryFields = ["page", "limit", "amount", "minAmount", "maxAmount", "category_id", "categoryId"];

  for (const field of numericQueryFields) {
    if (query[field] !== undefined) {
      const parsed = Number(query[field]);

      if (!Number.isFinite(parsed)) {
        throw sendError(`Invalid query value for ${field}`, StatusCodes.BAD_REQUEST, "VALIDATION_ERROR");
      }
    }
  }

  const dateQueryFields = ["date", "dateFrom", "dateTo"];

  for (const field of dateQueryFields) {
    if (query[field] !== undefined) {
      const parsedDate = new Date(query[field]);

      if (Number.isNaN(parsedDate.getTime())) {
        throw sendError(`Invalid query value for ${field}`, StatusCodes.BAD_REQUEST, "VALIDATION_ERROR");
      }
    }
  }

  if (query.type !== undefined) {
    ensureValidRecordType(query.type);
  }

  if (query.status !== undefined) {
    ensureValidRecordStatus(query.status);
  }

  if (query.categoryName !== undefined && typeof query.categoryName !== "string") {
    throw sendError("categoryName must be a string", StatusCodes.BAD_REQUEST, "VALIDATION_ERROR");
  }
};

const validateFinancialRecordSoftDeleteBody = (body) => {
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    throw sendError("Request body is required", StatusCodes.BAD_REQUEST, "VALIDATION_ERROR");
  }

  if (body.is_deleted === undefined) {
    throw sendError("is_deleted is required", StatusCodes.BAD_REQUEST, "VALIDATION_ERROR");
  }

  if (typeof body.is_deleted !== "boolean") {
    throw sendError("is_deleted must be a boolean", StatusCodes.BAD_REQUEST, "VALIDATION_ERROR");
  }
};

module.exports = {
  parseFinancialRecordId,
  parseCategoryId,
  parseRecordAmount,
  ensureValidRecordType,
  ensureValidRecordStatus,
  normalizeNotes,
  validateCreateFinancialRecordBody,
  validateUpdateFinancialRecordBody,
  validateGetFinancialRecordsQuery,
  validateFinancialRecordSoftDeleteBody,
};
