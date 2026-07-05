import express from "express";
import auth from "../middleware/auth.js";
import {
  blockOrUnblockUser,
  changeRole,
  // changeUserPassword,
  getAllUsers,
  getUser,
  updateUserProfile,
} from "../controllers/authController.js";
const userRouter = express.Router();

userRouter.get("/all/:pageSize/:pageNumber", getAllUsers);
userRouter.get("/profile", auth, getUser);

// userRouter.post("/update-password", changeUserPassword);
userRouter.post("/toggle-block", blockOrUnblockUser);
userRouter.post("/toggle-role", changeRole);
userRouter.put("/profile", auth, updateUserProfile);

export default userRouter;
