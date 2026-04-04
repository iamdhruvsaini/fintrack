const { Op } = require("sequelize");
const { User, Role } = require("../models");
const CrudRepository = require("./crud.repository");

const userCrudRepository = new CrudRepository(User);

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

const findUserById = (id) => {
  return userCrudRepository.getById(id, {
    include: [
      {
        model: Role,
        as: "role",
        attributes: ["id", "name", "status"],
      },
    ],
  });
};

const findActiveRoleByName = (name) => {
  return Role.findOne({
    where: {
      name,
      status: "active",
      is_deleted: false,
    },
  });
};

const updateUserById = (id, payload) => {
  return userCrudRepository.updateById(id, payload);
};

module.exports = {
  findUsersWithFilters,
  findUserById,
  findActiveRoleByName,
  updateUserById,
};
