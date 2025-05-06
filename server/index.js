import express from 'express';
import dotenv from 'dotenv';

const app = express();
dotenv.config();

app.get('/', (req, res) => {
    res.json({ message: 'Hello from the server!' });
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
