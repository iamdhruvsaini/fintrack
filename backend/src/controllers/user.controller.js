const { sendResponse } = require("../utils");
const services = require("../services");
const validators = require("../validators");

const getUsers = async (req, res) => {
  const { page, limit, name, role, search } = req.query || {};

  const result = await services.userService.getUsers({
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
  const parsedUserId = validators.parseUserId(req.params?.id);
  validators.validateChangeUserRoleBody(req.body);

  const result = await services.userService.updateUserRole({
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
