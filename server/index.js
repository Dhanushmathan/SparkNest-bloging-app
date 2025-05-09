import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/config.js';
import userRouter from './routes/userRoutes.js';
import authRouter from './routes/authRoutes.js';

const app = express();
app.use(express.json());

dotenv.config();
connectDB();

app.use('/api/users', userRouter);
app.use('/api/auth', authRouter);

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
