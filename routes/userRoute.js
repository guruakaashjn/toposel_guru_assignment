import express from "express";
import { registerUser } from "../controllers/userController.js";

const userRoute = express.Router();

userRoute.get("/register", registerUser);

export default userRoute;
