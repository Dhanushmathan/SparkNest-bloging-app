import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { createPost } from '../controllers/postController.js';

const router = express.Router();

router.post('/create-post', verifyToken, createPost);

export default router;
