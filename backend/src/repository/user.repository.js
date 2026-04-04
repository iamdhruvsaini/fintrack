const { Op } = require("sequelize");
const { User, Role } = require("../models");

const findUsersWithFilters = async ({
  page,
  limit,
  name,
  role,
  search,
}) => {
  const offset = (page - 1) * limit;

  const where = {
    is_deleted: false,
  };

  if (name) {
    where.name = {
      [Op.iLike]: `%${name}%`,
    };
  }

  if (search) {
    where[Op.or] = [
      { name: { [Op.iLike]: `%${search}%` } },
      { "$role.name$": { [Op.iLike]: `%${search}%` } },
    ];
  }

  const roleWhere = {
    status: "active",
    is_deleted: false,
  };

  if (role) {
    roleWhere.name = {
      [Op.iLike]: `%${role}%`,
    };
  }

  return User.findAndCountAll({
    where,
    include: [
      {
        model: Role,
        as: "role",
        attributes: ["id", "name"],
        where: roleWhere,
        required: Boolean(role),
      },
    ],
    limit,
    offset,
    distinct: true,
    order: [["createdAt", "DESC"]],
  });
};

module.exports = {
  findUsersWithFilters,
};
