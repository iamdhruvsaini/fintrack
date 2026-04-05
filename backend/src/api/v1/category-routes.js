const router = require("express").Router();
const { asyncHandler, authMiddleware, authorize } = require("../../middlewares");
const { categoryController } = require("../../controllers");

router.get("/", authMiddleware,authorize(["admin", "analyst"]), asyncHandler(categoryController.getCategories));
router.get("/:id", authMiddleware,authorize(["admin", "analyst"]), asyncHandler(categoryController.getCategoryById));
router.post("/", authMiddleware, authorize(["admin"]), asyncHandler(categoryController.createCategory));
router.patch("/:id", authMiddleware, authorize(["admin"]), asyncHandler(categoryController.updateCategory));
router.delete("/:id", authMiddleware, authorize(["admin"]), asyncHandler(categoryController.deleteCategory));

module.exports = router;