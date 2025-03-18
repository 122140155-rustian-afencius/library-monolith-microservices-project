require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");

const userRoutes = require("./routes/userRoutes");

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

// Routes
app.use("/", userRoutes);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI || "mongodb://localhost:27017/library-users")
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

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`User Service running on port ${PORT}`));
