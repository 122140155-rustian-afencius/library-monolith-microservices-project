const express = require("express");
const router = express.Router();
const borrowingController = require("../controllers/borrowingController");

// Auth middleware
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !req.user.id) {
      return res.status(401).json({
        success: false,
        message: "Not authorized",
      });
    }

    if (
      roles.length === 0 ||
      (req.user.role && roles.includes(req.user.role))
    ) {
      return next();
    }

    return res.status(403).json({
      success: false,
      message: "Forbidden - insufficient privileges",
    });
  };
};

// Borrowing routes (requires authorization)
router.post("/borrow", authorize(), borrowingController.borrowBook);
router.put("/return/:borrowingId", authorize(), borrowingController.returnBook);
router.get("/me", authorize(), borrowingController.getUserBorrowings);

// Admin only routes
router.get("/", authorize("admin"), borrowingController.getAllBorrowings);

module.exports = router;
