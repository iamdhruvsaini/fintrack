const { QueryTypes } = require("sequelize");
const models = require("../models");
const queries = require("../queries");

const getSummary = async ({ userId }) => {
  const { query } = queries.buildSummaryQuery();
  const rows = await models.sequelize.query(query, {
    replacements: { userId },
    type: QueryTypes.SELECT,
  });

  return rows[0] || {
    total_income: 0,
    total_expense: 0,
    net_balance: 0,
  };
};

const getCategoryBreakdown = ({ userId }) => {
  const { query } = queries.buildCategoryBreakdownQuery();
  return models.sequelize.query(query, {
    replacements: { userId },
    type: QueryTypes.SELECT,
  });
};

const getTrends = ({ userId }) => {
  const { query } = queries.buildTrendsQuery();
  return models.sequelize.query(query, {
    replacements: { userId },
    type: QueryTypes.SELECT,
  });
};

const getRecentTransactions = ({ userId }) => {
  const { query } = queries.buildRecentTransactionsQuery();
  return models.sequelize.query(query, {
    replacements: { userId },
    type: QueryTypes.SELECT,
  });
};

const getCategoryDetails = async ({ userId, categoryId }) => {
  const { query } = queries.buildCategoryDetailsQuery();
  const rows = await models.sequelize.query(query, {
    replacements: { userId, categoryId },
    type: QueryTypes.SELECT,
  });

  return rows[0] || null;
};

module.exports = {
  getSummary,
  getCategoryBreakdown,
  getTrends,
  getRecentTransactions,
  getCategoryDetails,
};
