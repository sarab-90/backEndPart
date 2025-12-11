import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import prodRoutes from "./routes/prodRoutes.js";
dotenv.config();
connectDB();



const app = express();
app.use(cors());
app.use(express.json());
 
app.use('/api/users',userRoutes);
app.use('/api/products',prodRoutes);

const PORT = 5002
app.listen(PORT, ()=> console.log(`Server runing on port ${PORT}`))
 