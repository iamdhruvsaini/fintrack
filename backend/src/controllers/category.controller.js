const { StatusCodes } = require("http-status-codes");
const { sendResponse } = require("../utils");
const services = require("../services");
const validators = require("../validators");

const getCategories = async (req, res) => {
  const result = await services.categoryService.getCategories(req.query || {});

  sendResponse(res, {
    message: "Categories fetched successfully",
    data: result,
  });
};

const getCategoryById = async (req, res) => {
  const { id } = req.params;
  const category = await services.categoryService.getCategoryById(id);

  sendResponse(res, {
    message: "Category fetched successfully",
    data: {
      category,
    },
  });
};

const createCategory = async (req, res) => {
  validators.validateCreateCategoryBody(req.body);

  const { name, description, status } = req.body || {};
  const category = await services.categoryService.createCategory({
    name,
    description,
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
  validators.validateUpdateCategoryBody(req.body);

  const category = await services.categoryService.updateCategory(id, req.body || {});

  sendResponse(res, {
    message: "Category updated successfully",
    data: {
      category,
    },
  });
};

const deleteCategory = async (req, res) => {
  const { id } = req.params;
  const result = await services.categoryService.deleteCategory(id);

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