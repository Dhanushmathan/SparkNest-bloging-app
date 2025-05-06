import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/config.js';
import router from './routes/userRoutes.js';

const app = express();
app.use(express.json());

dotenv.config();
connectDB();

app.use('/api/users', router);

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
