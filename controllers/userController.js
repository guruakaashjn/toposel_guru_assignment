import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import { createNewUser, checkUserExists, generateUserJWTToken, getUserRecords } from "../services/userService.js"

export const registerUser = asyncHandler(async (req, res) => {
    const existingUser = await checkUserExists(req.body);
    if (existingUser) {
        console.log("User already exists in the db", existingUser);
        return res.status(409).json({ "error": "User creation failed", "message": "User already exists in the db" });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 5);
    req.body.password = hashedPassword;
    const newUserAdded = await createNewUser(req.body)

    console.log("User added to the db", newUserAdded);
    res.status(201).json(newUserAdded);
});

export const loginUser = asyncHandler(async (req, res) => {
    const existingUser = await checkUserExists(req.body);
    const { username, password } = req.body;
    if (!existingUser) {
        console.log("User does not exists in the db", username);
        return res.status(401).json({ "error": "User Authentication failed", "message": "User does not exists in the db" });
    }

    const { token, error } = await generateUserJWTToken(password, existingUser);
    if (error) {
        return res.status(401).json({ "error": "User Authentication failed", "message": error.message });
    }
    res.status(200).json({ token: token });
});

export const getUsers = asyncHandler(async (req, res) => {
    const users = await getUserRecords(req);
    res.status(200).json(users);
});