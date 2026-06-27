import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  productId: {type: String, required: true, unique: true},
  name: { type: String, required: true },
  description: { type: String, default: "" },
  price: { type: Number, required: true },
  originalPrice: { type: Number, default: 0 },
  image: { type: String, required: true },
  category: { type: String, required: true },
  stock: { type: Number, default: 0 },
  isAvailable: { type: Boolean, default: true },
}, { timestamps: true });

export default mongoose.model("Product", productSchema);