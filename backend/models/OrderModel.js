import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    orderId: {type: String, required: true, unique: true},
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    items: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "productId" },
        name: String,
        price: Number,
        quantity: Number,
        image: String,
      },
    ],
    shippingAddress: { type: String, required: true },
    paymentMethod: { type: String, default: "cash" },
    total: { type: Number, required: true },
    status: {
      type: String,
      enum: [
        "Placed",
        "Confirmed",
        "Preparing",
        "Out for Delivery",
        "Delivered",
        "Cancelled",
      ],
      default: "Placed",
    },
    email: {type: String, required: true},
    phone: {type: String, required: true},
  },
  { timestamps: true },
);

const OrderModel = mongoose.models.order || mongoose.model("order", orderSchema);

export default OrderModel;
