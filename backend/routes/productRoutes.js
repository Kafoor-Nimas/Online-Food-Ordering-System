import express from "express";

import {
  getProducts,
  getProductsForMenu,
  createProduct,
  deleteProduct,
  updateProduct,
  getProductById,
  searchProducts,
} from "../controllers/productController.js";
import auth from "../middleware/auth.js";

const productRouter = express.Router();

// Public routes — no auth needed
productRouter.get("/", getProductsForMenu);
productRouter.get("/search/:query", searchProducts);
productRouter.get("/:productId", getProductById);

// Admin routes — auth required
productRouter.get("/all", auth, getProducts);
productRouter.post("/", auth, createProduct);
productRouter.delete("/:productId", auth, deleteProduct);
productRouter.put("/:productId", auth, updateProduct);

export default productRouter;
