const { sendResponse } = require("../utils");
const { userService } = require("../services");
const { parseUserId, validateChangeUserRoleBody } = require("../validators");

const getUsers = async (req, res) => {
  const { page, limit, name, role, search } = req.query || {};

  const result = await userService.getUsers({
    page,
    limit,
    name,
    role,
    search,
  });

  sendResponse(res, {
    message: "Users fetched successfully",
    data: result,
  });
};

const changeUserRole = async (req, res) => {
  const { roleName } = req.body || {};
  const parsedUserId = parseUserId(req.params?.id);
  validateChangeUserRoleBody(req.body);

  const result = await userService.updateUserRole({
    userId: parsedUserId,
    roleName,
  });

  sendResponse(res, {
    message: result.changed ? "User role updated successfully" : "User already has the requested role",
    data: {
      user: result.publicUser,
    },
  });
};

module.exports = {
  getUsers,
  changeUserRole,
};
