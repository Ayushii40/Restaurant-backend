import mongoose from "mongoose";
import validator from "validator";

const reservationSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minlength: [3, "First name must contain at least 3 characters"],
    maxlength: [30, "First name must not exceed 30 characters"],
  },
  lastName: {
    type: String,
    required: true,
    minlength: [3, "Last name must contain at least 3 characters"],
    maxlength: [30, "Last name must not exceed 30 characters"],
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator: validator.isEmail,
      message: "Please provide a valid email",
    },
  },
  phone: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /^[0-9]{10}$/.test(v);
      },
      message: "Phone number must be exactly 10 digits",
    },
  },
  time: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});

export const Reservation = mongoose.model("Reservation", reservationSchema);
