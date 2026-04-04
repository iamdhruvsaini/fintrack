const userRepository = require("../repository/user.repository");
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

module.exports = {
  getUsers,
};
