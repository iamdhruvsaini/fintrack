const { Op } = require("sequelize");
const { Category } = require("../models");
const CrudRepository = require("./crud.repository");

const categoryCrudRepository = new CrudRepository(Category);

const ALLOWED_SORT_FIELDS = new Set(["createdAt", "updatedAt", "name"]);

const findCategoriesWithFilters = async ({
  page,
  limit,
  type,
  status,
  search,
  includeInactive,
  sortBy = "createdAt",
  sortOrder = "DESC",
}) => {
  const offset = (page - 1) * limit;

  const where = {};

  if (type) {
    where.type = type;
  }

  if (status) {
    where.status = status;
  } else if (!includeInactive) {
    where.status = "active";
  }

  if (search) {
    where.name = {
      [Op.iLike]: `%${search}%`,
    };
  }

  const safeSortBy = ALLOWED_SORT_FIELDS.has(sortBy) ? sortBy : "createdAt";
  const safeSortOrder = String(sortOrder).toUpperCase() === "ASC" ? "ASC" : "DESC";

  return Category.findAndCountAll({
    where: categoryCrudRepository.buildWhere(where),
    limit,
    offset,
    order: [[safeSortBy, safeSortOrder]],
  });
};

const findCategoryById = (id) => {
  return categoryCrudRepository.getById(id);
};

const findCategoryByName = (name, { includeDeleted = false } = {}) => {
  return categoryCrudRepository.getOne(
    {
      name,
    },
    {
      includeDeleted,
    }
  );
};

const createCategory = (payload) => {
  return categoryCrudRepository.create(payload);
};

const updateCategoryById = (id, payload) => {
  return categoryCrudRepository.updateById(id, payload);
};

const deleteCategoryById = (id) => {
  return categoryCrudRepository.deleteById(id);
};

module.exports = {
  findCategoriesWithFilters,
  findCategoryById,
  findCategoryByName,
  createCategory,
  updateCategoryById,
  deleteCategoryById,
};