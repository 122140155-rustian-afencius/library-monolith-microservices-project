const express = require("express");
const router = express.Router();
const bookController = require("../controllers/bookController");
const { protect, authorize } = require("../middlewares/auth");

// Public routes
router.get("/", bookController.getAllBooks);
router.get("/:id", bookController.getBookById);

// Admin only routes
router.post("/", protect, authorize("admin"), bookController.addBook);
router.put("/:id", protect, authorize("admin"), bookController.updateBook);
router.delete("/:id", protect, authorize("admin"), bookController.deleteBook);

module.exports = router;
