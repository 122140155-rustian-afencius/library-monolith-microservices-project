const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// Public routes
router.post("/register", userController.register);
router.post("/login", userController.login);

// Protected routes (requires user-data header from API Gateway)
router.get("/me", userController.getProfile);

// Internal service routes
router.get("/internal/:id", userController.getUserById);

module.exports = router;
