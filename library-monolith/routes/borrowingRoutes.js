const express = require("express");
const router = express.Router();
const borrowingController = require("../controllers/borrowingController");
const { protect, authorize } = require("../middlewares/auth");

// User routes
router.post("/borrow", protect, borrowingController.borrowBook);
router.put("/return/:borrowingId", protect, borrowingController.returnBook);
router.get("/me", protect, borrowingController.getUserBorrowings);

// Admin routes
router.get(
  "/",
  protect,
  authorize("admin"),
  borrowingController.getAllBorrowings
);

module.exports = router;
