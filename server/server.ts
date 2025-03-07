import cors from 'cors';
import dotenv from 'dotenv';
import express, { Express } from 'express';
import mongoose from 'mongoose';

import userRoutes from './routes/userRoutes';

dotenv.config();

const app: Express = express();
app.use(cors());
app.use(express.json());

const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/test';

mongoose.connect(mongoURI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

app.use('/users', userRoutes);

const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
