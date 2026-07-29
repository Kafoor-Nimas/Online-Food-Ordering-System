import mongoose from "mongoose";
import Review from "../models/ReviewModel.js";
import "../models/userModel.js"; 

const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    product: {
      // type: mongoose.Schema.Types.ObjectId,
      type: String, // ← change from ObjectId to String
      ref: "product",
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model("Review", reviewSchema);
