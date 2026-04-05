const { StatusCodes } = require("http-status-codes");
const { sendResponse } = require("../utils");
const { categoryService } = require("../services");
const {
  validateCreateCategoryBody,
  validateUpdateCategoryBody,
} = require("../validators");

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