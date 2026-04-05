const router = require("express").Router();
const { asyncHandler, authMiddleware, authorize } = require("../../middlewares");
const { financialRecordController } = require("../../controllers");

router.get("/", authMiddleware, asyncHandler(financialRecordController.getFinancialRecords));
router.get("/:id", authMiddleware, asyncHandler(financialRecordController.getFinancialRecordById));
router.post("/", authMiddleware, authorize(["admin"]), asyncHandler(financialRecordController.createFinancialRecord));
router.patch("/:id", authMiddleware, authorize(["admin"]), asyncHandler(financialRecordController.updateFinancialRecord));
router.patch("/:id/soft-delete", authMiddleware, authorize(["admin"]), asyncHandler(financialRecordController.setFinancialRecordSoftDeleteState));

module.exports = router;
