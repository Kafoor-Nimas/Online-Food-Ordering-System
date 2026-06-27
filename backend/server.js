import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import { createUser, loginUser } from "./controllers/userController.js";
import userRouter from "./router/userRouter.js";
import productRouter from "./router/productRouter.js";

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

//public routes
app.post("/api/users", createUser)
app.post("/api/users/login", loginUser)

app.use("/api/users", userRouter)
app.use("/api/products", productRouter)

const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Server is Live!");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});