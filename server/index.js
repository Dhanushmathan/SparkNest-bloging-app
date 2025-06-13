import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from './config/config.js';
import userRouter from './routes/userRoutes.js';
import authRouter from './routes/authRoutes.js';
// import profileRouter from './routes/userRoutes.js';
import cookieParser from 'cookie-parser';

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

dotenv.config();
connectDB();

app.use('/api/users', userRouter);
app.use('/api/auth', authRouter);
// app.use('/api/profile', profileRouter);

// Middleware to handle 404 errors
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    });
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
