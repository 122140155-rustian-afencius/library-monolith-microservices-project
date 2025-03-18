const Borrowing = require("../models/Borrowing");
const axios = require("axios");

// Service URLs
const BOOK_SERVICE_URL =
  process.env.BOOK_SERVICE_URL || "http://localhost:3002";
const USER_SERVICE_URL =
  process.env.USER_SERVICE_URL || "http://localhost:3001";

// Borrow a book
exports.borrowBook = async (req, res) => {
  try {
    const { bookId, dueDate } = req.body;
    const userId = req.user.id;

    // Verify book exists and is available by calling book service
    try {
      const bookResponse = await axios.get(`${BOOK_SERVICE_URL}/${bookId}`);
      const book = bookResponse.data.data;

      if (!book) {
        return res.status(404).json({
          success: false,
          message: "Book not found",
        });
      }

      if (book.availableQuantity <= 0) {
        return res.status(400).json({
          success: false,
          message: "Book is not available for borrowing",
        });
      }

      // Get user details for denormalized data
      const userResponse = await axios.get(
        `${USER_SERVICE_URL}/internal/${userId}`
      );
      const user = userResponse.data.user;

      // Create borrowing record
      const borrowing = await Borrowing.create({
        userId,
        bookId,
        dueDate: new Date(dueDate),
        bookTitle: book.title,
        bookAuthor: book.author,
        userName: user.name,
      });

      // Update book available quantity in book service
      await axios.put(`${BOOK_SERVICE_URL}/internal/quantity/${bookId}`, {
        increment: -1,
      });

      res.status(201).json({
        success: true,
        data: borrowing,
      });
    } catch (error) {
      console.error("Service communication error:", error);
      return res.status(500).json({
        success: false,
        message: "Error communicating with other services",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// Return a book
exports.returnBook = async (req, res) => {
  try {
    const { borrowingId } = req.params;

    // Check if borrowing record exists
    const borrowing = await Borrowing.findById(borrowingId);
    if (!borrowing) {
      return res.status(404).json({
        success: false,
        message: "Borrowing record not found",
      });
    }

    // Check if the user is the one who borrowed it or is an admin
    if (
      borrowing.userId.toString() !== req.user.id &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to return this book",
      });
    }

    // Check if book is already returned
    if (borrowing.status === "returned") {
      return res.status(400).json({
        success: false,
        message: "Book is already returned",
      });
    }

    // Update borrowing record
    borrowing.returnDate = Date.now();
    borrowing.status = "returned";

    // Calculate fine if returned after due date
    const dueDate = new Date(borrowing.dueDate);
    const returnDate = new Date(borrowing.returnDate);

    if (returnDate > dueDate) {
      const daysLate = Math.ceil(
        (returnDate - dueDate) / (1000 * 60 * 60 * 24)
      );
      borrowing.fine = daysLate * 1; // $1 per day fine
    }

    await borrowing.save();

    // Update book available quantity in book service
    try {
      await axios.put(
        `${BOOK_SERVICE_URL}/internal/quantity/${borrowing.bookId}`,
        {
          increment: 1,
        }
      );
    } catch (error) {
      console.error("Error updating book quantity:", error);
      // Continue with the return process even if book service update fails
      // We should implement a retry mechanism or event-based system in a real app
    }

    res.status(200).json({
      success: true,
      data: borrowing,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// Get all borrowings for a user
exports.getUserBorrowings = async (req, res) => {
  try {
    const userId = req.user.id;

    const borrowings = await Borrowing.find({ userId }).sort({
      borrowDate: -1,
    });

    res.status(200).json({
      success: true,
      count: borrowings.length,
      data: borrowings,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// Get all borrowings (admin only)
exports.getAllBorrowings = async (req, res) => {
  try {
    const { status, userId } = req.query;
    let query = {};

    if (status) query.status = status;
    if (userId) query.userId = userId;

    const borrowings = await Borrowing.find(query).sort({ borrowDate: -1 });

    res.status(200).json({
      success: true,
      count: borrowings.length,
      data: borrowings,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
