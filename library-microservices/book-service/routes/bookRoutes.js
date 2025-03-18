const express = require("express");
const router = express.Router();
const bookController = require("../controllers/bookController");

// Auth middleware from app.js will be used
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

// Public routes
router.get("/", bookController.getAllBooks);
router.get("/:id", bookController.getBookById);

// Admin only routes
router.post("/", authorize("admin"), bookController.addBook);
router.put("/:id", authorize("admin"), bookController.updateBook);
router.delete("/:id", authorize("admin"), bookController.deleteBook);

// Internal service routes
router.put("/internal/quantity/:id", bookController.updateBookQuantity);

module.exports = router;
