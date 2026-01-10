import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import productsRoutes from "./routes/productsRoutes.js";
import categoriesRoutes from "./routes/categoriesRoutes.js"
import authRoutes from "./routes/authRoutes.js"
dotenv.config();
connectDB();



const app = express();
app.use(cors());
app.use(express.json());
 
app.use('/api/users',userRoutes);
app.use('/api/products',productsRoutes);
app.use('/api/categories', categoriesRoutes);
app.use('/api',authRoutes)

const PORT = 5002
app.listen(PORT, ()=> console.log(`Server runing on port ${PORT}`))
 