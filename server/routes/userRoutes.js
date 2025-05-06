import express from 'express';
import { text } from '../controllers/userControllers.js';

const router = express.Router();

router.get('/', text);

export default router;