const { StatusCodes } = require("http-status-codes");
const { sendResponse } = require("../utils");
const { financialRecordService } = require("../services");
const {
  validateCreateFinancialRecordBody,
  validateUpdateFinancialRecordBody,
  validateGetFinancialRecordsQuery,
} = require("../validators");

const getFinancialRecords = async (req, res) => {
  validateGetFinancialRecordsQuery(req.query || {});

  const result = await financialRecordService.getFinancialRecords({
    userId: req.user?.id,
    page: req.query?.page,
    limit: req.query?.limit,
    categoryId: req.query?.category_id ?? req.query?.categoryId,
    categoryName: req.query?.categoryName,
    type: req.query?.type,
    status: req.query?.status,
    date: req.query?.date,
    dateFrom: req.query?.dateFrom,
    dateTo: req.query?.dateTo,
    amount: req.query?.amount,
    minAmount: req.query?.minAmount,
    maxAmount: req.query?.maxAmount,
  });

  sendResponse(res, {
    message: "Financial records fetched successfully",
    data: result,
  });
};

const getFinancialRecordById = async (req, res) => {
  const record = await financialRecordService.getFinancialRecordById({
    recordId: req.params?.id,
  });

  sendResponse(res, {
    message: "Financial record fetched successfully",
    data: {
      record,
    },
  });
};

const createFinancialRecord = async (req, res) => {
  validateCreateFinancialRecordBody(req.body);

  const { amount, type, notes, status } = req.body || {};
  const categoryId = req.body?.category_id ?? req.body?.categoryId;

  const record = await financialRecordService.createFinancialRecord({
    userId: req.user?.id,
    categoryId,
    amount,
    type,
    notes,
    status,
  });

  sendResponse(res, {
    message: "Financial record created successfully",
    statusCode: StatusCodes.CREATED,
    data: {
      record,
    },
  });
};

const updateFinancialRecord = async (req, res) => {
  validateUpdateFinancialRecordBody(req.body);

  const record = await financialRecordService.updateFinancialRecord({
    recordId: req.params?.id,
    payload: req.body || {},
  });

  sendResponse(res, {
    message: "Financial record updated successfully",
    data: {
      record,
    },
  });
};

module.exports = {
  createFinancialRecord,
  getFinancialRecordById,
  getFinancialRecords,
  updateFinancialRecord,
};
