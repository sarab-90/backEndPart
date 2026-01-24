import React from "react";
import { Button, TextField, Box, Typography, Card, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../../../api.js";
import Header from "../../Layout/Header.jsx";

function DisplayUsers() {
  const [users, setUsers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [SearchItem, setSearchItem] = useState("");
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
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
      if (res.status === 200) {
        setUsers((prev) => prev.filter((user) => user._id !== userId));
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error("Failed to delete user");
      console.log(error);
    }
  };
  // update user role
  const handleRoleUpdate = async (userId, newRole) => {
    try {
      const res = await api.put(`/updateRole/${userId}`, { newRole });
      if (res.status !== 200) {
        toast.error(res.data.message || "role update failed");
      }
      setUsers((prev) =>
        prev.map((user) =>
          user._id === userId ? [...prev, (user.role = newRole)] : user,
        ),
      );
    } catch (error) {
      toast.error("Failed to update user role");
      console.log(error);
    }
  };
  // add new user
  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/register", newUser);

      if (res.status !== 201) {
        toast.error(res.data.message);
        return;
      }
      setUsers((prev) => [...prev, newUser]);
      toast.success("User added successfully");
      setShowForm(false);
      fetchUsers();
    } catch (error) {
      toast.error("Failed to add user");
      console.log(error);
    }
  };

  // fetch users
  useEffect(() => {
    fetchUsers();
  }, []);
  return (
    <>
      <Header />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h5" fontWeight="bold">
          Users
        </Typography>
        {/* search user */}
        <TextField
          label="Search User"
          variant="outlined"
          size="small"
          value={SearchItem}
          onChange={(e) => setSearchItem(e.target.value)}
        >
        </TextField>
        
        <Button
          variant="contained"
          color="secondary"
          onClick={() => setShowForm(!showForm)}
        >
          Add New User
        </Button>
      </Box>
      {showForm && (
        <Card sx={{ maxWidth: 500, p: 2, mb: 4, backgroundColor: "#f9f9f9" }}>
          <Typography variant="h6" fontWeight="bold" mb={2}>
            Add New User
          </Typography>

          <Box
            component="form"
            sx={{
              display: "flex",
              gap: 2,
            }}
            onSubmit={handleAddUser}
          >
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  label="Name"
                  fullWidth
                  value={newUser.name}
                  onChange={(e) =>
                    setNewUser({ ...newUser, name: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="email"
                  fullWidth
                  value={newUser.email}
                  onChange={(e) =>
                    setNewUser({ ...newUser, email: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="password"
                  fullWidth
                  type="password"
                  value={newUser.password}
                  onChange={(e) =>
                    setNewUser({ ...newUser, password: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="confirm password"
                  fullWidth
                  type="password"
                  value={newUser.confirmPassword}
                  onChange={(e) =>
                    setNewUser({ ...newUser, confirmPassword: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="secondary"
                  sx={{ mt: 1 }}
                  type="submit"
                >
                  Add User
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Card>
      )}
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
          {users.filter(
            (user) => {
              return(
              user.name
                .toLowerCase()
                .includes(SearchItem.toLowerCase()) ||
                user.email.includes(SearchItem)
              );})
          .map((user, index) => {
            return (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <select
                    onChange={(e) => handleRoleUpdate(user._id, e.target.value)}
                    defaultValue={user.role}
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
                <td>
                  <button>Edit</button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleDelete(user._id)}
                  >
                    Delete
                  </Button>
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
