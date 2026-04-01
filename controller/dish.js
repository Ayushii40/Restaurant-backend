import { catchAsyncErrors } from "../error/error.js";
import ErrorHandler from "../error/error.js";
import { Dish } from "../models/dishSchema.js";

// GET ALL DISHES
export const getAllDishes = catchAsyncErrors(async (req, res, next) => {
  const dishes = await Dish.find();
  res.status(200).json({
    success: true,
    dishes,
  });
});

// ADD NEW DISH (ADMIN ONLY)
export const addDish = catchAsyncErrors(async (req, res, next) => {
  const { title, description, image, category, price } = req.body;
  if (!title || !description || !image || !category || !price) {
    return next(new ErrorHandler("Please provide all dish details!", 400));
  }
  const dish = await Dish.create({
    title,
    description,
    image,
    category,
    price,
    createdBy: req.user._id,
  });
  res.status(201).json({
    success: true,
    message: "Dish Added Successfully!",
    dish,
  });
});

// UPDATE DISH (ADMIN ONLY)
export const updateDish = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  let dish = await Dish.findById(id);
  if (!dish) {
    return next(new ErrorHandler("Dish not found!", 404));
  }
  dish = await Dish.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
    message: "Dish Updated Successfully!",
    dish,
  });
});

// DELETE DISH (ADMIN ONLY)
export const deleteDish = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const dish = await Dish.findById(id);
  if (!dish) {
    return next(new ErrorHandler("Dish not found!", 404));
  }
  await dish.deleteOne();
  res.status(200).json({
    success: true,
    message: "Dish Deleted Successfully!",
  });
});
