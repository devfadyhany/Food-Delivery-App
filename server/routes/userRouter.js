import express from "express";

import {
  ConfirmEmail,
  DeleteUser,
  EditUser,
  GetAllUsers,
  GetUserById,
  Login,
  Register,
} from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.get("/", GetAllUsers);
userRouter.get("/:id", GetUserById);
userRouter.post("/register", Register);
userRouter.post("/login", Login);
userRouter.post("/confirm", ConfirmEmail);
userRouter.put("/:id", EditUser);
userRouter.delete("/:id", DeleteUser);

export default userRouter;
