import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import cors from "cors";

import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import productsRoutes from "./routes/productsRoutes.js";
import categoriesRoutes from "./routes/categoriesRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import cookieParser from "cookie-parser";

dotenv.config();
connectDB();

const app = express();

// Middleware >>
app.use(cookieParser());
app.use(helmet());
// connect to front-end
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);
app.use(express.json());

//API routers >>
app.use("/api", userRoutes);
app.use("/api", productsRoutes);
app.use("/api", categoriesRoutes);
app.use("/api", authRoutes);

// error handling middleware

const PORT = 3000;
app.listen(PORT, () => console.log(`Server runing on port ${PORT}`));
