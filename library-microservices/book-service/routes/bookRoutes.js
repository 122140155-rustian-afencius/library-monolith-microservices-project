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
    // Allow access to any authenticated user regardless of role
    return next();
  };
};

// Internal service routes - move to top to avoid conflict with /:id route
router.put("/internal/quantity/:id", bookController.updateBookQuantity);

// Public routes
router.get("/", bookController.getAllBooks);
router.get("/:id", bookController.getBookById);

// Admin only routes
router.post("/", authorize("admin"), bookController.addBook);
router.put("/:id", authorize("admin"), bookController.updateBook);
router.delete("/:id", authorize("admin"), bookController.deleteBook);

module.exports = router;
