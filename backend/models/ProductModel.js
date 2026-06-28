import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    productId: { type: String, unique: true, sparse: true },
    name: { type: String, required: true },
    description: { type: String, default: "" },
    price: { type: Number, required: true },
    originalPrice: { type: Number, default: 0 },
    image: { type: String, required: true },
    category: { type: String, required: true },
    stock: { type: Number, default: 0 },
    inStock: { type: Boolean, default: true },
    unit: { type: String, default: "piece" },
    rating: { type: Number, default: 0 },
    reviewCount: { type: Number, default: 0 },
    isAvailable: { type: Boolean, default: true },
  },
  { timestamps: true },
);

const ProductModel =
  mongoose.models.product || mongoose.model("product", productSchema);

export default ProductModel;
