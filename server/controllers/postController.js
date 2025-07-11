import PostModel from "../model/postModel.js";
import { errorHandler } from "../utils/error.js";

export const createPost = async (req, res, next) => {
    if (!req.user.isAdmin) {
        return next(errorHandler(403, "You are not allowed to create a post!"));
    }
    if (!req.body || !req.body.title || !req.body.content) {
        return next(errorHandler(400, "Please provide a title and content!"));
    }
    const slug = req.body.title.replace(/[^a-zA-Z0-9]/g, ' ');
    const newPost = new PostModel({
        ...req.body,
        slug,
        userId: req.user.id,
    });
    try {
        const savedPost = await newPost.save();
        res.status(201).json(savedPost);
    } catch (error) {
        next(error);
    }
}