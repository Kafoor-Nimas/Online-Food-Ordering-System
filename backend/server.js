import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRouter from "./routes/authRoutes.js";
import productRouter from "./routes/productRoutes.js";

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 5000;

app.get("/", (req, res) => res.send("Server is Live!"));
app.use("/api/auth", authRouter);
app.use("/api/products", productRouter);


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
