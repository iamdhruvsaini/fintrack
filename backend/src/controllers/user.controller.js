const { sendResponse } = require("../utils");
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

module.exports = {
  getUsers,
};
