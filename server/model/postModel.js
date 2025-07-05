import { model, Schema } from "mongoose";

const postSchema = new Schema({
    userId: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        default: "https://img.freepik.com/free-photo/social-media-networking-online-communication-connect-concept_53876-124862.jpg",
    },
    category: {
        type: String,
        default: "uncategorized",
    },
    slug: {
        type: String,
        required: true,
        unique: true,
    },
}, { timestamps: true });

const PostModel = model("Post", postSchema);

export default PostModel;