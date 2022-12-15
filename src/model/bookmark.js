const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    product_id: { type: String, required: true },
    title: { type: String, required: true },
    quantity: { type: Number, required: true },
    priority: { type: String, required: true },
    description: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const BookModel = mongoose.model("bookmark", bookSchema);

module.exports = { BookModel };