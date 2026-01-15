import express from 'express';
import dotenv from 'dotenv';
import helmet from "helmet";
import cors from 'cors';

import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import productsRoutes from "./routes/productsRoutes.js";
import categoriesRoutes from "./routes/categoriesRoutes.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();
connectDB();

const app = express();

// Middleware >>
app.use(helmet());
// connect to front-end
app.use(cors({
    origin:"http://localhost:5173",
    methods: ["GET", "POST", "PUT","DELETE"],
    credentials: true
}));
app.use(express.json());

//API routers >>
app.use('/api/users',userRoutes);
app.use('/api/products',productsRoutes);
app.use('/api/categories', categoriesRoutes);
app.use('/api',authRoutes)

// error handling middleware

const PORT = 5002
app.listen(PORT, ()=> console.log(`Server runing on port ${PORT}`))
 