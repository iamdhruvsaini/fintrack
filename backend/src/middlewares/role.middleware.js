// src/middlewares/role.middleware.js
const authorize = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role.name)) {
      return res.status(403).json({ message: "Forbidden" });
    }
    next();
  };
};

module.exports = authorize;