import express from "express";

import {
  addCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} from "../controllers/categories.Controller.js";
import { protect } from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/adminMiddleware.js";

const router = express.Router();

router.post("/addCategory", protect, adminOnly, addCategory);

router.get("/getAllCategories", protect, getAllCategories);

router.get("/getCategoryById/:id", protect, getCategoryById);

router.put("/updateCategory/:id", protect, adminOnly, updateCategory);

router.delete("/deleteCategory/:id", protect, adminOnly, deleteCategory);

export default router;
