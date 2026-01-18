import React from "react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../../../api.js";

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
  // fetch users
  useEffect(() => {
    fetchUsers();
  }, []);
  return (
    <>
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
                  <button>Delete</button>
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
