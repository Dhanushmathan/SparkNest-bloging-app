import express from 'express';
import { deleteUser, signout, updateUser, uploadProfileImage } from '../controllers/userControllers.js';
import upload from '../middlewares/upload.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.post('/upload-profile/:userId', upload.single('image'), uploadProfileImage);
router.put('/update-user/:userId', verifyToken, updateUser);
router.delete('/delete-user/:userId', verifyToken, deleteUser);
router.post('/signout', signout);

export default router;