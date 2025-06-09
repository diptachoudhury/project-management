import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/auth.routes";
import taskRoutes from "./routes/task.routes";
import userRoutes from './routes/user.routes';
import { errorHandler, notFoundHandler } from './middlewares/error.middleware';

import connectDB
 from "./config/db";

dotenv.config();

const app = express();
connectDB();
// Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000',],
  credentials: true, 
}));
app.use(express.json());


// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/users', userRoutes);

app.use(notFoundHandler);
app.use(errorHandler)




const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(` Server running on http://localhost:${PORT}`);
});