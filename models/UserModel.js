import mongoose from "mongoose";

const userSchema = mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        fullName: {
            type: String,
            required: true,
        },
        dob: {
            type: String,
            required: true,
        },
        country: {
            type: String,
            required: true,
        },
    }, { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;