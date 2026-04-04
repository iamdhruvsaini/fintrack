const router = require("express").Router();
const { asyncHandler, authMiddleware, authorize } = require("../../middlewares");
const { userController } = require("../../controllers");

router.get("/", authMiddleware, authorize(["admin"]), asyncHandler(userController.getUsers));

module.exports = router;
