import express from "express";

import {
  getAllUsers,
  getUserById,
  searchUsers,
  deleteUser,
  updateUser,
  updateUserRole,
  changePassword,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/adminMiddleware.js";


const router = express.Router();

router.get("/user/:id", protect, getUserById);

router.get("/allUsers", protect, adminOnly, getAllUsers);

router.post("/searchUsers", searchUsers);

router.delete("/deleteUser/:id", protect, adminOnly, deleteUser);

router.put("/updateUser/:id", protect, updateUser);

router.put("/updateRole/:id", protect, adminOnly, updateUserRole);

router.put("/change/Password/:id", protect, changePassword);

export default router;
