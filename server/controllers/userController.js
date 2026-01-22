import User from "../models/users.Models.js";
import bcrypt from "bcryptjs";

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    console.log("users", users);
    res.status(200).json({ users: users });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// search users by name or email and id
export const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ user: user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const searchUsers = async (req, res) => {
  const { name, email, id } = req.body;

  try {
    const users = await User.find(
      { name: name },
      { email: email },
      { _id: id },
    );
    if (users.length < 1) {
      res.status(404).json({ message: "No users found" });
    }
    res.status(200).json({ users: users });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const userToDelete = await User.findByIdAndDelete(id);
    if (!userToDelete) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;

  try {
    const userToUpdate = await User.findByIdAndUpdate(
      id,
      { name, email },
      { new: true },
    );
    if (!userToUpdate) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ user: userToUpdate });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// update role of user
export const updateUserRole = async (req, res) => {
  const { id } = req.params;
  const { newRole } = req.body;
  try {
    const roleUpdated = await User.findByIdAndUpdate(
      id,
      { role: newRole },
      { new: true },
    );
    if (!roleUpdated) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ message: "User role updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
