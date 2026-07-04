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

//admin panel
orderRouter.post("/", auth, createOrder);
orderRouter.get("/:pageSize/:pageNumber", auth, getOrders);
orderRouter.put("/:orderId", auth, updateOrderStatusAndNotes);

//user facing
orderRouter.get("/myorders", auth, getMyOrders);
orderRouter.get("/:id", auth, getOrderById);

export default orderRouter;