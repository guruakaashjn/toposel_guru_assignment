import User from "../models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import expressAsyncHandler from "express-async-handler";

export const createNewUser = async (addUser) => {
    const newUser = new User({
        username: addUser.username,
        password: addUser.password,
        fullName: addUser.fullName,
        dob: addUser.dob,
        country: addUser.country,
    });

    await newUser.save();
    return newUser;
}

export const checkUserExists = async (body) => {
    const existingUser = await User.findOne({ username: body.username });
    return existingUser;
}

export const generateUserJWTToken = async (userPassword, existingUser) => {
    const passwordMatch = await bcrypt.compare(userPassword, existingUser.password);
    if (!passwordMatch) {
        return res.status(401).json({ "error": "User Authentication failed", "message": "User password mismatch" });
    }

    const token = await jwt.sign({ userId: existingUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return token;
};