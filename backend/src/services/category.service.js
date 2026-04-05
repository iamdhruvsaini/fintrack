const { StatusCodes } = require("http-status-codes");
const { categoryRepository } = require("../repository");
const { sendError } = require("../utils");
const {
  normalizeCategoryName,
  parseCategoryId,
  ensureValidCategoryType,
  ensureValidCategoryStatus,
} = require("../validators");

const getCategories = async ({
  page = 1,
  limit = 10,
  type,
  status,
  search,
  includeInactive,
  sortBy,
  sortOrder,
}) => {
  const parsedPage = Number(page) > 0 ? Number(page) : 1;
  const parsedLimit = Number(limit) > 0 ? Math.min(Number(limit), 100) : 10;

  const normalizedType = type ? ensureValidCategoryType(type) : undefined;
  const normalizedStatus = status ? ensureValidCategoryStatus(status) : undefined;
  const parsedIncludeInactive = String(includeInactive).toLowerCase() === "true";

  const { rows, count } = await categoryRepository.findCategoriesWithFilters({
    page: parsedPage,
    limit: parsedLimit,
    type: normalizedType,
    status: normalizedStatus,
    search: search ? String(search).trim() : undefined,
    includeInactive: parsedIncludeInactive,
    sortBy: sortBy ? String(sortBy).trim() : undefined,
    sortOrder: sortOrder ? String(sortOrder).trim() : undefined,
  });

  const totalPages = Math.ceil(count / parsedLimit) || 1;

  return {
    categories: rows,
    pagination: {
      page: parsedPage,
      limit: parsedLimit,
      totalItems: count,
      totalPages,
      hasNextPage: parsedPage < totalPages,
      hasPreviousPage: parsedPage > 1,
    },
  };
};

const getCategoryById = async (id) => {
  const parsedId = parseCategoryId(id);
  const category = await categoryRepository.findCategoryById(parsedId);

  if (!category) {
    throw sendError("Category not found", StatusCodes.NOT_FOUND, "CATEGORY_NOT_FOUND");
  }

  return category;
};

const createCategory = async ({ name, type, status = "active" }) => {
  const normalizedName = normalizeCategoryName(name);

  if (!normalizedName) {
    throw sendError("Category name is required", StatusCodes.BAD_REQUEST, "VALIDATION_ERROR");
  }

  const normalizedType = ensureValidCategoryType(type);
  const normalizedStatus = ensureValidCategoryStatus(status);

  const existingCategory = await categoryRepository.findCategoryByName(normalizedName, {
    includeDeleted: true,
  });

  if (existingCategory) {
    throw sendError("Category name already exists", StatusCodes.CONFLICT, "CATEGORY_ALREADY_EXISTS");
  }

  return categoryRepository.createCategory({
    name: normalizedName,
    type: normalizedType,
    status: normalizedStatus,
    is_deleted: false,
  });
};

const updateCategory = async (id, payload) => {
  const parsedId = parseCategoryId(id);
  const category = await categoryRepository.findCategoryById(parsedId);

  if (!category) {
    throw sendError("Category not found", StatusCodes.NOT_FOUND, "CATEGORY_NOT_FOUND");
  }

  const updates = {};

  if (payload.name !== undefined) {
    const normalizedName = normalizeCategoryName(payload.name);

    if (!normalizedName) {
      throw sendError("Category name cannot be empty", StatusCodes.BAD_REQUEST, "VALIDATION_ERROR");
    }

    const existingCategory = await categoryRepository.findCategoryByName(normalizedName, {
      includeDeleted: true,
    });

    if (existingCategory && Number(existingCategory.id) !== parsedId) {
      throw sendError("Category name already exists", StatusCodes.CONFLICT, "CATEGORY_ALREADY_EXISTS");
    }

    updates.name = normalizedName;
  }

  if (payload.type !== undefined) {
    updates.type = ensureValidCategoryType(payload.type);
  }

  if (payload.status !== undefined) {
    updates.status = ensureValidCategoryStatus(payload.status);
  }

  return categoryRepository.updateCategoryById(parsedId, updates);
};

const deleteCategory = async (id) => {
  const parsedId = parseCategoryId(id);
  const category = await categoryRepository.findCategoryById(parsedId);

  if (!category) {
    throw sendError("Category not found", StatusCodes.NOT_FOUND, "CATEGORY_NOT_FOUND");
  }

  await categoryRepository.deleteCategoryById(parsedId);

  return {
    id: parsedId,
  };
};

module.exports = {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};