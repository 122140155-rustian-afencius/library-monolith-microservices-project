require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");

const bookRoutes = require("./routes/bookRoutes");

const app = express();

// Middleware
app.use(express.json());
app.use(morgan("dev"));

// Extract user data from headers
app.use((req, res, next) => {
  const userData = req.headers["user-data"];
  if (userData) {
    try {
      req.user = JSON.parse(userData);
    } catch (error) {
      console.error("Error parsing user data:", error);
    }
  }
  next();
});

// Auth middleware
const authorize = (...roles) => {
  return (req, res, next) => {
    // If no user data or no roles required, proceed
    if (!roles.length) return next();

    if (!req.user || !req.user.id) {
      return res.status(401).json({
        success: false,
        message: "Not authorized",
      });
    }

    // Verify role by making request to user service
    // In real-world case, you might want to verify the role from JWT or user service
    // For simplicity, we'll assume the role is included in the user data from API Gateway
    if (req.user.role && roles.includes(req.user.role)) {
      return next();
    }

    return res.status(403).json({
      success: false,
      message: "Forbidden - insufficient privileges",
    });
  };
};

// Routes
app.use("/", bookRoutes);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI || "mongodb://localhost:27017/library-books")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("MongoDB Connection Error:", err));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Something broke!",
  });
});

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => console.log(`Book Service running on port ${PORT}`));
