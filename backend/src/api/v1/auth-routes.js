const router = require("express").Router();
const { asyncHandler } = require("../../middlewares");
const { authController } = require("../../controllers");

router.post("/register", asyncHandler(authController.register));
router.post("/login", asyncHandler(authController.login));

module.exports = router;