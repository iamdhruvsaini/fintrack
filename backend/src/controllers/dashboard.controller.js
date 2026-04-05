const { sendResponse } = require("../utils");
const services = require("../services");

const getSummary = async (req, res) => {
  const data = await services.dashboardService.getSummary({
    userId: req.user?.id,
  });

  sendResponse(res, {
    message: "Dashboard summary fetched successfully",
    data,
  });
};

const getCategoryBreakdown = async (req, res) => {
  const data = await services.dashboardService.getCategoryBreakdown({
    userId: req.user?.id,
  });

  sendResponse(res, {
    message: "Category breakdown fetched successfully",
    data,
  });
};

const getTrends = async (req, res) => {
  const data = await services.dashboardService.getTrends({
    userId: req.user?.id,
  });

  sendResponse(res, {
    message: "Trends fetched successfully",
    data,
  });
};

const getRecentTransactions = async (req, res) => {
  const data = await services.dashboardService.getRecentTransactions({
    userId: req.user?.id,
  });

  sendResponse(res, {
    message: "Recent transactions fetched successfully",
    data,
  });
};

const getCategoryDetails = async (req, res) => {
  const data = await services.dashboardService.getCategoryDetails({
    userId: req.user?.id,
    categoryId: req.params.categoryId,
  });

  sendResponse(res, {
    message: "Category details fetched successfully",
    data,
  });
};

module.exports = {
  getSummary,
  getCategoryBreakdown,
  getTrends,
  getRecentTransactions,
  getCategoryDetails,
};
