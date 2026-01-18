import express from "express";

import {
  getAllUsers,
  getUserById,
  searchUsers,
  deleteUser,
  updateUser,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/adminMiddleware.js";

const router = express.Router();

router.get("/user/:id", protect, getUserById);

router.get("/allUsers", protect, adminOnly, getAllUsers);

router.post("/searchUsers", searchUsers);

router.delete("/deleteUser/:id", protect, deleteUser);

router.put("/updateUser/:id", protect, updateUser);

export default router;
