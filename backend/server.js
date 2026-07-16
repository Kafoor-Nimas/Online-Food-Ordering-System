import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRouter from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import userRouter from "./router/userRouter.js";
import orderRouter from "./routes/orderRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";

dotenv.config();
connectDB();

const app = express();
app.use(
  cors({
    origin: function (origin, callback) {
      const allowedOrigins = [
        "https://online-food-ordering-wheat-mu.vercel.app", // ← our frontend
      ];
      if (
        !origin ||
        origin.startsWith("http://localhost") ||
        allowedOrigins.includes(origin)
      ) {
        return callback(null, true);
      }
      callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  }),
);
app.use(express.json());

const port = process.env.PORT || 5000;

app.get("/", (req, res) => res.send("Server is Live!"));

app.use("/api/auth", authRouter);
app.use("/api/products", productRoutes);
app.use("/api/users", userRouter);
app.use("/api/orders", orderRouter);
app.use("/api/reviews", reviewRoutes);

const server = app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

server.on("listening", () => {
  console.log("✅ Express is listening");
});

server.on("error", (err) => {
  console.error("❌ Listen error:", err);
});
