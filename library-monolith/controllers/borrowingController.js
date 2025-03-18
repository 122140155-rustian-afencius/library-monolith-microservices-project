const Borrowing = require("../models/Borrowing");
const Book = require("../models/Book");
const User = require("../models/User");

// Borrow a book
exports.borrowBook = async (req, res) => {
  try {
    const { bookId, dueDate } = req.body;
    const userId = req.user.id;

    // Check if book exists
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    // Check if book is available
    if (book.availableQuantity <= 0) {
      return res.status(400).json({
        success: false,
        message: "Book is not available for borrowing",
      });
    }

    // Create a borrowing record
    const borrowing = await Borrowing.create({
      user: userId,
      book: bookId,
      dueDate: new Date(dueDate),
    });

    // Update book available quantity
    book.availableQuantity -= 1;
    await book.save();

    res.status(201).json({
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

    // Update book available quantity
    const book = await Book.findById(borrowing.book);
    book.availableQuantity += 1;
    await book.save();

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

    const borrowings = await Borrowing.find({ user: userId })
      .populate("book", "title author")
      .sort({ borrowDate: -1 });

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
    if (userId) query.user = userId;

    const borrowings = await Borrowing.find(query)
      .populate("book", "title author")
      .populate("user", "name email")
      .sort({ borrowDate: -1 });

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
