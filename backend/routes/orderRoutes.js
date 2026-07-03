import express from "express";
import auth from "../middleware/auth.js";
import { createOrder, getOrders, updateOrderStatusAndNotes } from "../controllers/orderController.js";

const orderRouter = express.Router();

orderRouter.post("/", auth, createOrder);
orderRouter.get("/:pageSize/:pageNumber", auth, getOrders);
orderRouter.put("/:orderId", auth, updateOrderStatusAndNotes);

export default orderRouter;