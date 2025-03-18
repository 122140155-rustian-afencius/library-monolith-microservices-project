require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const { createProxyMiddleware } = require("http-proxy-middleware");
const jwt = require("jsonwebtoken");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// Authentication middleware
const authenticate = (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(); // Allow request to proceed (some routes might be public)
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret");
    req.user = {
      id: decoded.id,
      role: decoded.role,
      name: decoded.name,
      email: decoded.email,
    };
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }
};

app.use(authenticate);

// Proxy setup for user service
app.use(
  "/api/users",
  createProxyMiddleware({
    target: process.env.USER_SERVICE_URL || "http://localhost:3001",
    changeOrigin: true,
    pathRewrite: {
      "^/api/users": "/",
    },
    onProxyReq: (proxyReq, req) => {
      // Add user data header if available
      if (req.user) {
        proxyReq.setHeader("user-data", JSON.stringify(req.user));
      }

      // Handle JSON body for POST/PUT/PATCH requests
      if (["POST", "PUT", "PATCH"].includes(req.method) && req.body) {
        const bodyData = JSON.stringify(req.body);
        // Update content length and type
        proxyReq.setHeader("Content-Length", Buffer.byteLength(bodyData));
        proxyReq.setHeader("Content-Type", "application/json");
        // Write body data to the proxied request
        proxyReq.write(bodyData);
      }
    },
  })
);

// Proxy setup for book service
app.use(
  "/api/books",
  createProxyMiddleware({
    target: process.env.BOOK_SERVICE_URL || "http://localhost:3002",
    changeOrigin: true,
    pathRewrite: {
      "^/api/books": "/",
    },
    onProxyReq: (proxyReq, req) => {
      if (req.user) {
        proxyReq.setHeader("user-data", JSON.stringify(req.user));
      }

      // Handle JSON body for POST/PUT/PATCH requests
      if (["POST", "PUT", "PATCH"].includes(req.method) && req.body) {
        const bodyData = JSON.stringify(req.body);
        proxyReq.setHeader("Content-Length", Buffer.byteLength(bodyData));
        proxyReq.setHeader("Content-Type", "application/json");
        proxyReq.write(bodyData);
      }
    },
  })
);

// Proxy setup for borrowing service
app.use(
  "/api/borrowings",
  createProxyMiddleware({
    target: process.env.BORROWING_SERVICE_URL || "http://localhost:3003",
    changeOrigin: true,
    pathRewrite: {
      "^/api/borrowings": "/",
    },
    onProxyReq: (proxyReq, req) => {
      if (req.user) {
        proxyReq.setHeader("user-data", JSON.stringify(req.user));
      }

      // Handle JSON body for POST/PUT/PATCH requests
      if (["POST", "PUT", "PATCH"].includes(req.method) && req.body) {
        const bodyData = JSON.stringify(req.body);
        proxyReq.setHeader("Content-Length", Buffer.byteLength(bodyData));
        proxyReq.setHeader("Content-Type", "application/json");
        proxyReq.write(bodyData);
      }
    },
  })
);

// Main route
app.get("/", (req, res) => {
  res.json({
    message: "Library System API Gateway",
    services: [
      { name: "User Service", path: "/api/users" },
      { name: "Book Service", path: "/api/books" },
      { name: "Borrowing Service", path: "/api/borrowings" },
    ],
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Something went wrong!",
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`API Gateway running on port ${PORT}`));
