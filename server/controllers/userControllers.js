import { cloudinary } from "../config/cloudinary.js";
import UserModel from "../model/userModel.js";
import fs from "fs";

export const uploadProfileImage = async (req, res) => {
    try {
        const imagePath = req.file.path;

        const result = await cloudinary.uploader.upload(imagePath, {
            folder: "profile-pictures"
        });

        const userId = req.params.id;
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