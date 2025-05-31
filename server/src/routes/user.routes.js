import express from "express";
import UserController from "../controllers/user.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const userRouter = express.Router();

userRouter.route("/auth/register").post(UserController.regiterUser);
userRouter.route("/auth/login").post(UserController.loginUser);
userRouter
    .route("/auth/profile")
    .get(authMiddleware, UserController.getProfile);

export default userRouter;
