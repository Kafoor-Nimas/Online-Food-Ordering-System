import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRouter from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import userRouter from "./router/userRouter.js";
import orderRoutes from "./routes/orderRoutes.js";
import adminOrderRoutes from "./routes/adminOrderRoutes.js";


dotenv.config();
connectDB();

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(express.json());

const port = process.env.PORT || 5000;

app.get("/", (req, res) => res.send("Server is Live!"));

app.use("/api/auth", authRouter);
app.use("/api/products", productRoutes);
app.use("/api/users", userRouter);
app.use("/api/orders", orderRoutes);
app.use("/api/admin/orders", adminOrderRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});