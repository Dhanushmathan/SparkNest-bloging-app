import UserModel from "../model/userModel.js";
import bcrypt from 'bcryptjs';
import { errorHandler } from "../utils/error.js";

export const signup = async (req, res, next) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password || username === '' || email === '' || password === '') {
        next(errorHandler(400, 'All fields are required'));
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new UserModel({
        username,
        email,
        password: hashedPassword
    });

    try {
        await newUser.save();
        return res.status(200).json({ message: 'Signup successful' });
    } catch (error) {
        next(error);
    }
}