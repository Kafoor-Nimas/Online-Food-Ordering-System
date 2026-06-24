import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["customer", "admin"], default: "customer" },
    address: { type: String, default: "" },
    phone: { type: String, default: "" },
    avatar: { type: String, default: "" },
  },
  { timestamps: true },
);

const UserModel = mongoose.models.user || mongoose.model("user", userSchema);

export default UserModel;
