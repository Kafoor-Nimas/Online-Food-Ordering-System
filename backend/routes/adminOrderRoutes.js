import express from "express";
import { protect, adminOnly } from "../middleware/authMiddleware.js";
import OrderModel from "../models/OrderModel.js";

const router = express.Router();

router.get("/orders", protect, adminOnly, async (req, res) => {
  try {
    const orders = await OrderModel.find().sort({ createdAt: -1 });
    res.json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;