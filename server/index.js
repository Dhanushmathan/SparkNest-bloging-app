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
