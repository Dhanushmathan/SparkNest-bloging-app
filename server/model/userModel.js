import { model, Schema } from "mongoose";

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    profilePicture: {
        type: String,
        default: "https://static-00.iconduck.com/assets.00/profile-circle-icon-512x512-zxne30hp.png"
    },
    role: {
        type: String,
        unique: true,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true }
);

const UserModel = model("User", userSchema);
export default UserModel;
