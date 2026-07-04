import express from "express";
import auth from "../middleware/auth.js";
import {
    createOrder,
    getOrders,
    getMyOrders,
    getOrderById,
    updateOrderStatusAndNotes,
} from "../controllers/orderController.js";

const orderRouter = express.Router();

//put specific routes BEFORE dynamic ones
orderRouter.post("/", auth, createOrder);
orderRouter.get("/myorders", auth, getMyOrders);      
orderRouter.get("/:pageSize/:pageNumber", auth, getOrders);
orderRouter.put("/:orderId", auth, updateOrderStatusAndNotes);
orderRouter.get("/:id", auth, getOrderById);            // ← keep last

export default orderRouter;