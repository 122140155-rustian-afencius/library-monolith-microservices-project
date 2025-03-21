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
      console.log("User data extracted in book service:", req.user);
    } catch (error) {
      console.error("Error parsing user data:", error);
    }
  }
  next();
});

// Auth middleware
const authorize = (...roles) => {
  return (req, res, next) => {
    // Check if user exists
    if (!req.user || !req.user.id) {
      return res.status(401).json({
        success: false,
        message: "Not authorized",
      });
    }

    // Allow access if user has any role
    if (req.user.role) {
      return next();
    }

    return res.status(403).json({
      success: false,
      message: "Forbidden - no role assigned",
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
