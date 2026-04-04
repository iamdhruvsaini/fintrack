module.exports = {
  asyncHandler: require("./async-handler.middleware"),
  authMiddleware: require("./auth.middleware"),
  authorize: require("./role.middleware"),
};
