import express from "express";
import {
    getMyOrders,
    getOrderById,
    updateOrderStatus,
} from "../controllers/orderController.js";
import {
    protect, 
    adminOnly
} from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/myorders", protect, getMyOrders);
router.get("/:id", protect, getOrderById);
router.put("/:id/status", protect, adminOnly, updateOrderStatus);

export default router;
