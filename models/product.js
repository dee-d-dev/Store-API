const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Product name must be stated"],
  },
  price: {
    type: Number,
    required: [true, "Price must be provided"],
  },
  featured: {
    type: Boolean,
    default: false,
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  company: {
    enum: {
      value: ["ROOM XIX", "ASHLUXE", "GUCCI", "LOUIS VUITTON"],
      message: `{value} is not supported`,
    },
  },
});

const ProductModel = ("Product", ProductSchema);

module.exports = ProductModel;
