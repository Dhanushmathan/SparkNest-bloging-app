import UserModel from "../model/userModel.js";
import bcrypt from 'bcryptjs';
import { errorHandler } from "../utils/error.js";
import jwt from 'jsonwebtoken';

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
};

export const signin = async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password || email === '' || password === '') {
        next(errorHandler(400, 'All fields are required'));
    };

    try {
        const validUser = await UserModel.findOne({ email });

        if (!validUser) {
            return next(errorHandler(404, 'User not found'));
        }

        const validPassword = bcrypt.compareSync(password, validUser.password);

        if (!validPassword) {
            return next(errorHandler(401, 'Invalid password'));
        }

        const token = jwt.sign(
            {
                id: validUser._id,
            },
            process.env.JWT_SECRET,
        );

        const { password: pass, ...rest } = validUser._doc;
        // Remove password from the user object before sending it to the client

        res.status(200).cookie('access_token', token, {
            httpOnly: true,
        }).json({
            message: 'Signin successful',
            user: {
                id: validUser._id,
                username: validUser.username,
                email: validUser.email,
                profilePicture: validUser.profilePicture,
            }
        });

    } catch (error) {
        next(error);
    }

};

export const google = async (req, res, next) => {
    const { name, email, googlePhotoURL } = req.body;

    try {
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET);
            const { password, ...rest } = existingUser._doc; // Destructure to remove password and other sensitive fields
            res.status(200).cookie('access_token', token, {
                httpOnly: true,
            }).json(rest);
        } else {
            const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8); // Generate a random password
            const hashedPassword = await bcrypt.hashSync(generatedPassword, 10);
            const newUser = new UserModel({
                username: name,
                email,
                password: hashedPassword,
                profilePicture: googlePhotoURL
            });
            await newUser.save();
            const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
            const { password, ...rest } = newUser._doc;
            res.status(200).cookie('access_token', token, {
                httpOnly: true,
            }).json(rest);
        };
    } catch (error) {
        next(error);
    }

};
