import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import { createNewUser, checkUserExists } from "../services/userService.js"

export const registerUser = asyncHandler(async (req, res) => {
    try {
        const existingUser = await checkUserExists(req.body);
        if (!existingUser) {
            const hashedPassword = await bcrypt.hash(req.body.password, 5);
            req.body.password = hashedPassword;
            const newUserAdded = await createNewUser(req.body)

            console.log("User added to the db", newUserAdded);
            res.status(201).json(newUserAdded);
        } else {
            console.log("User already exists in the db", existingUser);
            res.status(409).json({ "message": "User already exists in the db" });
        }
    } catch (error) {
        res.status(500).json({ "error": "user registration failed", "message": error.message });
    }
});

