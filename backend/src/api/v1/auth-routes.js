const router = require("express").Router();
const { asyncHandler, authMiddleware } = require("../../middlewares");
const { authController } = require("../../controllers");

router.get("/profile", authMiddleware, asyncHandler(authController.getProfile));
router.post("/register", asyncHandler(authController.register));
router.post("/login", asyncHandler(authController.login));

module.exports = router;