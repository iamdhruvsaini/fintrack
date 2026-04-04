const { StatusCodes } = require("http-status-codes");
const { sendResponse, sendError } = require("../utils");
const { userService } = require("../services");

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
  const { id } = req.params;
  const { roleName } = req.body;

  if (!id) {
    throw sendError("User id is required", StatusCodes.BAD_REQUEST, "VALIDATION_ERROR");
  }

  if (!roleName) {
    throw sendError("Role name is required", StatusCodes.BAD_REQUEST, "VALIDATION_ERROR");
  }

  const result = await userService.updateUserRole({
    userId: id,
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
