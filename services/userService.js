import User from "../models/UserModel.js";

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

export const checkUserExists = async (addUser) => {
    const existingUser = await User.findOne({ username: addUser.username });
    return existingUser;
}
