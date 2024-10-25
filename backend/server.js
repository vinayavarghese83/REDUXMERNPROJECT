import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import userRoutes from './routes/userRoutes.js';
import { notFound,errorHandler } from './middlewares/errorMiddleware.js';
import connectDB from './config/db.js';
import cookieParser from 'cookie-parser';
import adminRoutes from './routes/adminRoutes.js'
import path from 'path';
import cors from 'cors';
import { fileURLToPath } from 'url';

const port =process.env.PORT || 7000;
const app=express();
connectDB();

app.use(cors({
     origin :'http://localhost:3000',
     credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use('/uploads',express.static(path.join(__dirname,'backend/uploads')));

app.use('/api/user',userRoutes);
app.use('/api/admin',adminRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(port, ()=> console.log(`Server started on port ${port}`));
