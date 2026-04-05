const { Op } = require("sequelize");
const models = require("../models");
const CrudRepository = require("./crud.repository");

const categoryCrudRepository = new CrudRepository(models.Category);

const ALLOWED_SORT_FIELDS = new Set(["createdAt", "updatedAt", "name"]);

const findCategoriesWithFilters = async ({
  page,
  limit,
  status,
  search,
  includeInactive,
  sortBy = "createdAt",
  sortOrder = "DESC",
}) => {
  const offset = (page - 1) * limit;

  const where = {};

  if (status) {
    where.status = status;
  } else if (!includeInactive) {
    where.status = "active";
  }

  if (search) {
    where[Op.or] = [
      { name: { [Op.iLike]: `%${search}%` } },
      { description: { [Op.iLike]: `%${search}%` } },
    ];
  }

  const safeSortBy = ALLOWED_SORT_FIELDS.has(sortBy) ? sortBy : "createdAt";
  const safeSortOrder = String(sortOrder).toUpperCase() === "ASC" ? "ASC" : "DESC";

  return models.Category.findAndCountAll({
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