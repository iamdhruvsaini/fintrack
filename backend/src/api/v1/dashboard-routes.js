const router = require("express").Router();
const { asyncHandler, authMiddleware } = require("../../middlewares");
const controllers = require("../../controllers");

router.get("/summary", authMiddleware, asyncHandler(controllers.dashboardController.getSummary));
router.get("/categories/breakdown", authMiddleware, asyncHandler(controllers.dashboardController.getCategoryBreakdown));
router.get("/trends", authMiddleware, asyncHandler(controllers.dashboardController.getTrends));
router.get("/recent-transactions", authMiddleware, asyncHandler(controllers.dashboardController.getRecentTransactions));
router.get("/categories/:categoryId/details", authMiddleware, asyncHandler(controllers.dashboardController.getCategoryDetails));

module.exports = router;
