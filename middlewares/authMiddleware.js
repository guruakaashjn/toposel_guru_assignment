import jwt from "jsonwebtoken";
import User from "../models/UserModel.js";
import expressAsyncHandler from "express-async-handler";

const verifyToken = expressAsyncHandler(async (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) {
        return res.status(401).json({ error: "Access Denied", message: "No JWT Auth Token" });
    }

    try {
        const decoded = jwt.verify(token.split(" ")[ 1 ], process.env.JWT_SECRET);
        const getUser = await User.findById(decoded.userId);
        if (!getUser) {
            return res.status(401).json({ error: "Access Denied", message: "User Id does not exist" });
        }

        req.userId = decoded.userId;
        next();
    } catch (error) {
        res.status(401).json({ error: "Access Denied", message: "Invalid JWT Auth Token" });
    }
});

export default verifyToken;