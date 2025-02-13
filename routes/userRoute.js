import express from "express";
import { registerUser, loginUser, getUsers } from "../controllers/userController.js";
import verifyToken from "../middlewares/authMiddleware.js";
import { validateRegisterUserPaylaod, validateLoginUserPayload } from "../middlewares/verifyPayload.js";

const userRoute = express.Router();

userRoute.post("/register", validateRegisterUserPaylaod, registerUser);
userRoute.post("/login", validateLoginUserPayload, loginUser);
userRoute.get("/", verifyToken, getUsers);

export default userRoute;