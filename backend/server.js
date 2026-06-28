import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

import authRouter from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";

import userRouter from "./router/userRouter.js";

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 5000;

app.get("/", (req, res) => res.send("Server is Live!"));

app.use("/api/auth", authRouter); // login, register
app.use("/api/products", productRoutes); // all product routes
app.use("/api/users", userRouter); // admin user management

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
