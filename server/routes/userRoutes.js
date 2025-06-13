import express from 'express';
import { updateUser, uploadProfileImage } from '../controllers/userControllers.js';
import upload from '../middlewares/upload.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.post('/upload-profile/:userId', upload.single('image'), uploadProfileImage);
router.put('/update-user/:userId', verifyToken, updateUser);

export default router;