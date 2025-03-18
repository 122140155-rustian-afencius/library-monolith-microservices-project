const mongoose = require("mongoose");

const borrowingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  book: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Book",
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
});

module.exports = mongoose.model("Borrowing", borrowingSchema);
