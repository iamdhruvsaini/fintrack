const router = require("express").Router();
const { asyncHandler, authMiddleware, authorize } = require("../../middlewares");
const { userController } = require("../../controllers");

router.get("/", authMiddleware, authorize(["admin"]), asyncHandler(userController.getUsers));
router.patch("/:id/role", authMiddleware, authorize(["admin"]), asyncHandler(userController.changeUserRole));

module.exports = router;
