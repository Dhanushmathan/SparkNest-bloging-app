import express from 'express';
import { uploadProfileImage } from '../controllers/userControllers.js';
import upload from '../middlewares/upload.js';

const router = express.Router();

router.post('/upload-profile/:userId', upload.single('image'), uploadProfileImage);

export default router;