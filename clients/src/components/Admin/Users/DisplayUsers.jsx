import React from "react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../../../api.js";
import Header from "../../Layout/Header.jsx";

function DisplayUsers() {
  const [users, setUsers] = useState([]);
  console.log("here are users", users);
  // fetch Users
  const fetchUsers = async () => {
    console.log("here are users 2", users);

    try {
      console.log("here are users 21", users);

      const res = await api.get("/allUsers");
      console.log("res users", res.users);
      console.log("here are users 3", users);

      // check if there is no users
      if (res.data.users.length === 0) {
        toast.error(res.data.message || "No users found");
        return;
      }
      setUsers(res.data.users);
    } catch (error) {
      toast.error("Failed to fetch users");
      console.log(error);
    }
  };
// delete user
  const handleDelete = async (userId) => {
    try {
      const res = await api.delete(`/deleteUser/${userId}`);
      if (res.status !== 200) {
        setUsers((prev) => prev.filter((user) => user._id !== userId));
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error("Failed to delete user");
      console.log(error);
    }
  }

  // fetch users
  useEffect(() => {
    fetchUsers();
  }, []);
  return (
    <>
      <Header/>
      <h3>Users</h3>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => {
            return (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <button>Edit</button>
                  <button onClick={() => handleDelete(user._id)}>Delete</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
export default DisplayUsers;
