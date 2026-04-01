import mongoose from "mongoose";

const dishSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required!"],
    minLength: [3, "Title must contain at least 3 characters!"],
    maxLength: [30, "Title must not exceed 30 characters!"],
  },
  description: {
    type: String,
    required: [true, "Description is required!"],
  },
  image: {
    type: String,
    required: [true, "Image URL is required!"],
  },
  category: {
    type: String,
    required: [true, "Category is required!"],
  },
  price: {
    type: String, // String to handle currency symbols like ₹
    required: [true, "Price is required!"],
  },
  createdBy: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Dish = mongoose.model("Dish", dishSchema);
