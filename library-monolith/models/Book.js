const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  author: {
    type: String,
    required: true,
    trim: true,
  },
  isbn: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  genre: {
    type: String,
    required: true,
  },
  publishedDate: {
    type: Date,
  },
  quantity: {
    type: Number,
    required: true,
    min: 0,
    default: 1,
  },
  availableQuantity: {
    type: Number,
    min: 0,
    default: function () {
      return this.quantity;
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Book", bookSchema);
