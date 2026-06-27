import express from "express"
import { blockOrUnblockUser, changeRole, changeUserPassword, createUser, getAllUsers, getUser, loginUser, updateUserProfile } from "../controllers/userController.js"

const userRouter = express.Router()

userRouter.get("/all/:pageSize/:pageNumber", getAllUsers)
userRouter.get("/profile", getUser)
userRouter.post("/", createUser)
userRouter.post("/login", loginUser)
userRouter.post("/update-password", changeUserPassword)
userRouter.post("/toggle-block", blockOrUnblockUser)
userRouter.post("/toggle-role", changeRole)
userRouter.put("/profile", updateUserProfile)

export default userRouter