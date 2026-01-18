import express from "express";

import {
  addProduct,
  getAllProducts,
  getProductById,
  deleteProduct,
  updateProduct,
} from "../controllers/products.Controller.js";
import { protect } from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/adminMiddleware.js";
import { checkRole } from "../middleware/checkRoleMiddleware.js";

const router = express.Router();

router.post("/admin/products", protect, adminOnly, addProduct);

router.get("/products", protect, getAllProducts);

router.get("/products/:id", protect, getProductById);

router.delete("/admin/products/:id", protect, adminOnly, deleteProduct);

router.put(
  "/admin/products/:id",
  protect,
  checkRole("seller"),
  adminOnly,
  updateProduct,
);

export default router;
