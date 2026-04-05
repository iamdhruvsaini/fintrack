const { StatusCodes } = require("http-status-codes");
const { ValidationError, ForeignKeyConstraintError } = require("sequelize");
const repositories = require("../repository");
const { sendError, userToPublic } = require("../utils");
const validators = require("../validators");

const createFinancialRecord = async ({ userId, categoryId, amount, type, notes, status = "active" }) => {
  const parsedUserId = validators.parseUserId(userId);
  const parsedCategoryId = validators.parseCategoryId(categoryId);
  const parsedAmount = validators.parseRecordAmount(amount);
  const parsedDate = new Date();
  const normalizedType = validators.ensureValidRecordType(type);
  const normalizedStatus = validators.ensureValidRecordStatus(status);
  const normalizedNotes = validators.normalizeNotes(notes);

  const category = await repositories.categoryRepository.findCategoryById(parsedCategoryId);

  if (!category) {
    throw sendError("Category not found", StatusCodes.NOT_FOUND, "CATEGORY_NOT_FOUND");
  }

  if (category.status !== "active") {
    throw sendError("Category is inactive", StatusCodes.BAD_REQUEST, "CATEGORY_INACTIVE");
  }

  try {
    const createdRecord = await repositories.financialRecordRepository.createFinancialRecord({
      user_id: parsedUserId,
      category_id: parsedCategoryId,
      amount: parsedAmount,
      type: normalizedType,
      date: parsedDate,
      notes: normalizedNotes,
      status: normalizedStatus,
      is_deleted: false,
    });

    return repositories.financialRecordRepository.findFinancialRecordById(createdRecord.id);
  } catch (error) {
    if (error instanceof ValidationError) {
      throw sendError("Invalid financial record payload", StatusCodes.BAD_REQUEST, "VALIDATION_ERROR");
    }

    if (error instanceof ForeignKeyConstraintError) {
      throw sendError("Invalid category reference", StatusCodes.BAD_REQUEST, "INVALID_CATEGORY_REFERENCE");
    }

    throw error;
  }
};

const getFinancialRecords = async ({
  userId,
  page = 1,
  limit = 10,
  categoryId,
  categoryName,
  type,
  status,
  date,
  dateFrom,
  dateTo,
  amount,
  minAmount,
  maxAmount,
}) => {
  const parsedUserId = validators.parseUserId(userId);
  const parsedPage = Number(page) > 0 ? Number(page) : 1;
  const parsedLimit = Number(limit) > 0 ? Math.min(Number(limit), 100) : 10;

  const parsedCategoryId =
    categoryId !== undefined && categoryId !== null && String(categoryId).trim() !== ""
      ? validators.parseCategoryId(categoryId)
      : undefined;

  const parsedCategoryName =
    categoryName !== undefined && categoryName !== null && String(categoryName).trim() !== ""
      ? String(categoryName).trim()
      : undefined;

  const parsedType =
    type !== undefined && type !== null && String(type).trim() !== ""
      ? validators.ensureValidRecordType(type)
      : undefined;

  const parsedStatus =
    status !== undefined && status !== null && String(status).trim() !== ""
      ? validators.ensureValidRecordStatus(status)
      : undefined;

  const parsedDate =
    date !== undefined && date !== null && String(date).trim() !== ""
      ? new Date(date).toISOString().slice(0, 10)
      : undefined;

  const parsedDateFrom =
    dateFrom !== undefined && dateFrom !== null && String(dateFrom).trim() !== ""
      ? new Date(dateFrom).toISOString().slice(0, 10)
      : undefined;

  const parsedDateTo =
    dateTo !== undefined && dateTo !== null && String(dateTo).trim() !== ""
      ? new Date(dateTo).toISOString().slice(0, 10)
      : undefined;

  const parsedAmount =
    amount !== undefined && amount !== null && String(amount).trim() !== ""
      ? validators.parseRecordAmount(amount)
      : undefined;

  const parsedMinAmount =
    minAmount !== undefined && minAmount !== null && String(minAmount).trim() !== ""
      ? validators.parseRecordAmount(minAmount)
      : undefined;

  const parsedMaxAmount =
    maxAmount !== undefined && maxAmount !== null && String(maxAmount).trim() !== ""
      ? validators.parseRecordAmount(maxAmount)
      : undefined;

  if (
    parsedMinAmount !== undefined &&
    parsedMaxAmount !== undefined &&
    parsedMinAmount > parsedMaxAmount
  ) {
    throw sendError("minAmount cannot be greater than maxAmount", StatusCodes.BAD_REQUEST, "VALIDATION_ERROR");
  }

  if (
    parsedDateFrom !== undefined &&
    parsedDateTo !== undefined &&
    parsedDateFrom > parsedDateTo
  ) {
    throw sendError("dateFrom cannot be later than dateTo", StatusCodes.BAD_REQUEST, "VALIDATION_ERROR");
  }

  const { rows, count } = await repositories.financialRecordRepository.findFinancialRecordsWithFilters({
    userId: parsedUserId,
    categoryId: parsedCategoryId,
    categoryName: parsedCategoryName,
    type: parsedType,
    status: parsedStatus,
    date: parsedDate,
    dateFrom: parsedDateFrom,
    dateTo: parsedDateTo,
    amount: parsedAmount,
    minAmount: parsedMinAmount,
    maxAmount: parsedMaxAmount,
    page: parsedPage,
    limit: parsedLimit,
  });

  const totalPages = Math.ceil(count / parsedLimit) || 1;

  return {
    records: rows,
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

const getFinancialRecordById = async ({ recordId }) => {
  const parsedRecordId = validators.parseFinancialRecordId(recordId);
  const record = await repositories.financialRecordRepository.findFinancialRecordById(parsedRecordId);

  if (!record) {
    throw sendError("Financial record not found", StatusCodes.NOT_FOUND, "FINANCIAL_RECORD_NOT_FOUND");
  }

  return {
    ...record.toJSON(),
    user: record.user ? userToPublic(record.user) : null,
  };
};

const updateFinancialRecord = async ({ recordId, payload }) => {
  const parsedRecordId = validators.parseFinancialRecordId(recordId);

  const existingRecord = await repositories.financialRecordRepository.findFinancialRecordById(parsedRecordId);

  if (!existingRecord) {
    throw sendError("Financial record not found", StatusCodes.NOT_FOUND, "FINANCIAL_RECORD_NOT_FOUND");
  }

  const updates = {};
  const incomingCategoryId = payload.category_id ?? payload.categoryId;

  if (incomingCategoryId !== undefined) {
    const parsedCategoryId = validators.parseCategoryId(incomingCategoryId);
    const category = await repositories.categoryRepository.findCategoryById(parsedCategoryId);

    if (!category) {
      throw sendError("Category not found", StatusCodes.NOT_FOUND, "CATEGORY_NOT_FOUND");
    }

    if (category.status !== "active") {
      throw sendError("Category is inactive", StatusCodes.BAD_REQUEST, "CATEGORY_INACTIVE");
    }

    updates.category_id = parsedCategoryId;
  }

  if (payload.amount !== undefined) {
    updates.amount = validators.parseRecordAmount(payload.amount);
  }

  if (payload.type !== undefined) {
    updates.type = validators.ensureValidRecordType(payload.type);
  }

  if (payload.notes !== undefined) {
    updates.notes = validators.normalizeNotes(payload.notes);
  }

  if (payload.status !== undefined) {
    updates.status = validators.ensureValidRecordStatus(payload.status);
  }

  try {
    await repositories.financialRecordRepository.updateFinancialRecordById(parsedRecordId, updates);
    return repositories.financialRecordRepository.findFinancialRecordById(parsedRecordId);
  } catch (error) {
    if (error instanceof ValidationError) {
      throw sendError("Invalid financial record payload", StatusCodes.BAD_REQUEST, "VALIDATION_ERROR");
    }

    if (error instanceof ForeignKeyConstraintError) {
      throw sendError("Invalid category reference", StatusCodes.BAD_REQUEST, "INVALID_CATEGORY_REFERENCE");
    }

    throw error;
  }
};

module.exports = {
  createFinancialRecord,
  getFinancialRecordById,
  getFinancialRecords,
  updateFinancialRecord,
};
