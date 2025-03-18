const mongoose = require("mongoose");

const borrowingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  bookId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  borrowDate: {
    type: Date,
    default: Date.now,
    required: true,
  },
  dueDate: {
    type: Date,
    required: true,
  },
  returnDate: {
    type: Date,
  },
  status: {
    type: String,
    enum: ["borrowed", "returned", "overdue"],
    default: "borrowed",
  },
  fine: {
    type: Number,
    default: 0,
  },
  // Denormalized data for better performance
  bookTitle: String,
  bookAuthor: String,
  userName: String,
});

module.exports = mongoose.model("Borrowing", borrowingSchema);
