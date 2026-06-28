import express from "express";
import {
  blockOrUnblockUser,
  changeRole,
  changeUserPassword,
  getAllUsers,
  getUser,
  updateUserProfile,
} from "../controllers/authController.js";
const userRouter = express.Router();

userRouter.get("/all/:pageSize/:pageNumber", getAllUsers);
userRouter.get("/profile", getUser);

userRouter.post("/update-password", changeUserPassword);
userRouter.post("/toggle-block", blockOrUnblockUser);
userRouter.post("/toggle-role", changeRole);
userRouter.put("/profile", updateUserProfile);

export default userRouter;
