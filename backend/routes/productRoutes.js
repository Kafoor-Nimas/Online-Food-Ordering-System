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

const productRouter = express.Router();

// Menu page routes (your functions)
productRouter.get("/", getProductsForMenu);
productRouter.get("/search/:query", searchProducts);

// Admin routes (her functions)
productRouter.get("/all", getProducts);
productRouter.post("/", createProduct);
productRouter.delete("/:productId", deleteProduct);
productRouter.put("/:productId", updateProduct);
productRouter.get("/:productId", getProductById);

export default productRouter;
