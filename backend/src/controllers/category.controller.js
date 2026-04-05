const { StatusCodes } = require("http-status-codes");
const { sendResponse, sendError } = require("../utils");
const { categoryService } = require("../services");

const ALLOWED_MUTATION_FIELDS = ["name", "type", "status"];

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

const getCategories = async (req, res) => {
  const result = await categoryService.getCategories(req.query || {});

  sendResponse(res, {
    message: "Categories fetched successfully",
    data: result,
  });
};

const getCategoryById = async (req, res) => {
  const { id } = req.params;
  const category = await categoryService.getCategoryById(id);

  sendResponse(res, {
    message: "Category fetched successfully",
    data: {
      category,
    },
  });
};

const createCategory = async (req, res) => {
  validateCreateCategoryBody(req.body);

  const { name, type, status } = req.body || {};
  const category = await categoryService.createCategory({
    name,
    type,
    status,
  });

  sendResponse(res, {
    message: "Category created successfully",
    statusCode: StatusCodes.CREATED,
    data: {
      category,
    },
  });
};

const updateCategory = async (req, res) => {
  const { id } = req.params;
  validateUpdateCategoryBody(req.body);

  const category = await categoryService.updateCategory(id, req.body || {});

  sendResponse(res, {
    message: "Category updated successfully",
    data: {
      category,
    },
  });
};

const deleteCategory = async (req, res) => {
  const { id } = req.params;
  const result = await categoryService.deleteCategory(id);

  sendResponse(res, {
    message: "Category deleted successfully",
    data: result,
  });
};

module.exports = {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};