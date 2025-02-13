import User from "../models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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
        return { token: "", error: new Error("User password mismatch") };
    }

    const token = jwt.sign({ userId: existingUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return { token: token, error: null };
};

export const getUserRecords = async (req, res) => {
    const { search } = req.query;
    const users = (search) ? await User.find({ username: new RegExp(search, "i") }) : await User.find({});
    return users;
}