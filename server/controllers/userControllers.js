import { cloudinary } from "../config/cloudinary.js";
import UserModel from "../model/userModel.js";
import fs from "fs";
import { errorHandler } from "../utils/error.js";
import bcrypt from "bcryptjs";

export const uploadProfileImage = async (req, res) => {
    try {
        const imagePath = req.file.path;

        const result = await cloudinary.uploader.upload(imagePath, {
            folder: "profile-pictures"
        });

        const userId = req.params.userId;
        const user = await UserModel.findById(userId);
        if (!user) {
            fs.unlinkSync(imagePath);
            return res.status(404).json({ error: "User not found" });
        }

        fs.unlinkSync(imagePath);

        const updatedUser = await UserModel.findByIdAndUpdate(userId,
            {
                profilePicture: result.secure_url
            },
            { new: true }
        );

        res.status(200).json({
            message: "Profile picture uploaded", user: updatedUser
        });

    } catch (error) {
        console.error("Upload Failed!!!", error);

        res.status(500).json({
            error: "Uploaded failed", details: error.message
        });
    }
};

export const updateUser = async (req, res, next) => {
    if (req.user.id !== req.params.userId) {
        return next(errorHandler(403, "You are not allowed to update this user"));
    }
    if (req.body.password) {
        if (req.body.password.length < 6) {
            return next(errorHandler(400, "Password must be at least 6 characters"));
        }
        req.body.password = bcrypt.hashSync(req.body.password, 10);
    }

    if (req.body.username) {
        if (req.body.username.length < 7 || req.body.username.length > 20) {
            return next(errorHandler(400, "Username must be between 3 and 20 characters"));
        }
        // if (req.body.username.includes(' ')) {
        //     return next(errorHandler(400, "Username cannot contain spaces"));
        // }
        // if (req.body.username !== req.body.username.toLowerCase()) {
        //     return next(errorHandler(400, "Username must be lowercase"));
        // }
        if (req.body.username.match(/^[a-zA-Z0-9]+$/)) {
            return next(errorHandler(400, "Username can only contain letters and numbers"));
        }
    }

    try {
        const updateUser = await UserModel.findByIdAndUpdate(req.params.userId, {
            $set: {
                username: req.body.username,
            },
        }, { new: true });
        const { password, ...rest } = updateUser._doc;
        res.status(200).json(rest);
    } catch (error) {
        next(error);
    }

};

export const deleteUser = async (req, res, next) => {
    if (req.user.id !== req.params.userId) {
        return next(errorHandler(403, "You are not allowed to delete this user"));
    }

    try {
        await UserModel.findByIdAndDelete(req.params.userId);
        res.status(200).json("User has been deleted");
    } catch (error) {
        next(error);
    }

};

export const signout = async (req, res, next) => {
    try {
        res.clearCookie('access_token').status(200).json({ message: 'Signout successful' });
    } catch (error) {
        next(error);
    }
};
