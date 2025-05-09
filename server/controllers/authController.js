import UserModel from "../model/userModel.js";
import bcrypt from 'bcryptjs';

export const signup = async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password || username === '' || email === '' || password === '') {
        return res.status(400).json({ message: 'All fields are required' });
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
        return res.status(500).json({ message: 'Internal server error' });
    }
}