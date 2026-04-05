const { StatusCodes } = require("http-status-codes");
const repositories = require("../repository");
const { sendError } = require("../utils");
const validators = require("../validators");

const toNumber = (value) => Number(value || 0);

const getSummary = async ({ userId }) => {
  const parsedUserId = validators.parseUserId(userId);
  const summary = await repositories.dashboardRepository.getSummary({ userId: parsedUserId });

  return {
    totalIncome: toNumber(summary.total_income),
    totalExpense: toNumber(summary.total_expense),
    netBalance: toNumber(summary.net_balance),
  };
};

const getCategoryBreakdown = async ({ userId }) => {
  const parsedUserId = validators.parseUserId(userId);
  const rows = await repositories.dashboardRepository.getCategoryBreakdown({ userId: parsedUserId });

  return rows.map((row) => ({
    categoryId: row.category_id,
    categoryName: row.category_name,
    totalAmount: toNumber(row.total_amount),
    transactionCount: Number(row.transaction_count || 0),
  }));
};

const getTrends = async ({ userId }) => {
  const parsedUserId = validators.parseUserId(userId);
  const rows = await repositories.dashboardRepository.getTrends({ userId: parsedUserId });

  return rows.map((row) => ({
    month: row.month,
    income: toNumber(row.income),
    expense: toNumber(row.expense),
  }));
};

const getRecentTransactions = async ({ userId }) => {
  const parsedUserId = validators.parseUserId(userId);
  const rows = await repositories.dashboardRepository.getRecentTransactions({ userId: parsedUserId });

  return rows.map((row) => ({
    id: row.id,
    amount: toNumber(row.amount),
    type: row.type,
    date: row.date,
    notes: row.notes,
    status: row.status,
    category: {
      id: row.category_id,
      name: row.category_name,
      description: row.category_description,
    },
  }));
};

const getCategoryDetails = async ({ userId, categoryId }) => {
  const parsedUserId = validators.parseUserId(userId);
  const parsedCategoryId = validators.parseCategoryId(categoryId);

  const row = await repositories.dashboardRepository.getCategoryDetails({
    userId: parsedUserId,
    categoryId: parsedCategoryId,
  });

  if (!row) {
    throw sendError("Category not found", StatusCodes.NOT_FOUND, "CATEGORY_NOT_FOUND");
  }

  return {
    categoryId: row.category_id,
    categoryName: row.category_name,
    categoryDescription: row.category_description,
    totalIncome: toNumber(row.total_income),
    totalExpense: toNumber(row.total_expense),
    netBalance: toNumber(row.net_balance),
    transactionCount: Number(row.transaction_count || 0),
  };
};

module.exports = {
  getSummary,
  getCategoryBreakdown,
  getTrends,
  getRecentTransactions,
  getCategoryDetails,
};
