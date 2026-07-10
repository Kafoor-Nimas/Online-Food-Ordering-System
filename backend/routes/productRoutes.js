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

//specific routes FIRST — before any dynamic /:param routes
productRouter.get("/all", auth, getProducts);
productRouter.get("/search/:query", searchProducts);
productRouter.get("/", getProductsForMenu);
productRouter.post("/", auth, createProduct);
productRouter.delete("/:productId", auth, deleteProduct);
// productRouter.put("/:productId", auth, updateProduct);
productRouter.put("/:productId", auth, updateProduct);

productRouter.get("/:productId", getProductById); 

export default productRouter;
