import OrderModel from "../models/OrderModel.js";
import ProductModel from "../models/ProductModel.js";
import { isAdmin } from "./authController.js";

export async function createOrder(req, res) {

    if (!req.user) {
        return res.status(401).json({
            message: "Unauthorized. Please log in to place an order."
        });
    }

    try {

        if (!req.body.shippingAddress) {
            return res.status(400).json({
                message: "Shipping address is required"
            });
        }

        if (!req.body.phone) {
            return res.status(400).json({
                message: "Phone number is required"
            });
        }

        if (!req.body.items || req.body.items.length === 0) {
            return res.status(400).json({
                message: "Order must contain at least one item"
            });
        }

        const userId = req.user?.id || req.user?._id;

        if (!userId) {
            return res.status(401).json({
                message: "Unauthorized. Invalid user information in token."
            });
        }

        const orderData = {
            orderId: "ORD000001",
            userId,
            items: [],
            shippingAddress: req.body.shippingAddress,
            paymentMethod: req.body.paymentMethod || "cash",
            total: 0,
            status: "Placed",
            email: req.user.email,
            phone: req.body.phone,
        };

        const lastOrder = await OrderModel.findOne().sort({ createdAt: -1 });

        if (lastOrder) {

            const lastNumber = parseInt(
                lastOrder.orderId.replace("ORD", "")
            );

            const newNumber = lastNumber + 1;

            orderData.orderId =
                "ORD" + newNumber.toString().padStart(6, "0");
        }

        for (const item of req.body.items) {

            const product = await ProductModel.findOne({
                productId: item.productId
            });

            if (!product) {
                return res.status(404).json({
                    message: `Product ${item.productId} not found`
                });
            }

            if (!product.isAvailable) {
                return res.status(400).json({
                    message: `${product.name} is unavailable`
                });
            }

            if (product.stock < item.quantity) {
                return res.status(400).json({
                    message: `Only ${product.stock} items available for ${product.name}`
                });
            }

            orderData.items.push({
                product: product._id,
                name: product.name,
                price: product.price,
                quantity: item.quantity,
                image: product.image
            });

            orderData.total += product.price * item.quantity;

            product.stock -= item.quantity;
            await product.save();
        }

        const order = new OrderModel(orderData);

        await order.save();

        res.status(201).json({
            message: "Order created successfully",
            orderId: order.orderId
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Error creating order",
            error: error.message
        });
    }
}

export async function getOrders(req, res) {

    if (!req.user) {
        return res.status(401).json({
            message: "Unauthorized"
        });
    }

    const pageSize = parseInt(req.params.pageSize || "10");

    const pageNumber = parseInt(req.params.pageNumber || "1");

    try {

        const filter = isAdmin(req)
            ? {}
            : { email: req.user.email };

        const totalOrders =
            await OrderModel.countDocuments(filter);

        const totalPages =
            Math.ceil(totalOrders / pageSize);

        const orders = await OrderModel.find(filter)
            .sort({ createdAt: -1 })
            .skip((pageNumber - 1) * pageSize)
            .limit(pageSize);

        res.json({
            orders,
            totalPages
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Error fetching orders",
            error: error.message
        });
    }
}

export async function updateOrderStatusAndNotes(req, res) {

    if (!isAdmin(req)) {
        return res.status(403).json({
            message: "Forbidden"
        });
    }

    try {

        const order = await OrderModel.findOneAndUpdate(

            {
                orderId: req.params.orderId
            },

            {
                status: req.body.status,
                notes: req.body.notes
            },

            {
                new: true
            }

        );

        if (!order) {
            return res.status(404).json({
                message: "Order not found"
            });
        }

        res.json({
            message: "Order updated successfully",
            order
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Error updating order",
            error: error.message
        });
    }
}

export const getMyOrders = async (req, res) => {
  try {
    const orders = await OrderModel.find({ userId: req.user._id }).sort({
      createdAt: -1,
    });
    res.json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getOrderById = async (req, res) => {
  try {
    const order = await OrderModel.findById(req.params.id);
    if (!order)
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });

    if (
      order.userId.toString() !== req.user._id.toString() &&
      !req.user.isAdmin
    ) {
      return res.status(403).json({ success: false, message: "Forbidden" });
    }

    res.json({ success: true, order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await OrderModel.findById(req.params.id);
    if (!order)
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });

    order.status = status;
    await order.save();

    res.json({ success: true, order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
