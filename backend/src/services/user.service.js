const { userRepository } = require("../repository");
const { StatusCodes } = require("http-status-codes");
const { sendError } = require("../utils");
const { userToPublic } = require("../utils");

const getUsers = async ({
  page = 1,
  limit = 10,
  name,
  role,
  search,
}) => {
  const parsedPage = Number(page) > 0 ? Number(page) : 1;
  const parsedLimit = Number(limit) > 0 ? Math.min(Number(limit), 100) : 10;

  const { rows, count } = await userRepository.findUsersWithFilters({
    page: parsedPage,
    limit: parsedLimit,
    name: name ? String(name).trim() : undefined,
    role: role ? String(role).trim() : undefined,
    search: search ? String(search).trim() : undefined,
  });

  const totalPages = Math.ceil(count / parsedLimit) || 1;

  return {
    users: rows.map((user) => userToPublic(user)),
    pagination: {
      page: parsedPage,
      limit: parsedLimit,
      totalItems: count,
      totalPages,
      hasNextPage: parsedPage < totalPages,
      hasPreviousPage: parsedPage > 1,
    },
  };
};

const updateUserRole = async ({ userId, roleName }) => {
  const normalizedRoleName = String(roleName).trim().toLowerCase();

  const user = await userRepository.findUserById(userId);

  if (!user) {
    throw sendError("User not found", StatusCodes.NOT_FOUND, "USER_NOT_FOUND");
  }

  const role = await userRepository.findActiveRoleByName(normalizedRoleName);

  if (!role) {
    throw sendError("Invalid or inactive role", StatusCodes.BAD_REQUEST, "INVALID_ROLE");
  }

  if (Number(user.role_id) === Number(role.id)) {
    return {
      user,
      publicUser: userToPublic(user),
      changed: false,
    };
  }

  await userRepository.updateUserById(userId, {
    role_id: role.id,
  });

  const updatedUser = await userRepository.findUserById(userId);

  return {
    user: updatedUser,
    publicUser: userToPublic(updatedUser),
    changed: true,
  };
};

module.exports = {
  getUsers,
  updateUserRole,
};
