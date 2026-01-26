import React, { useState } from "react";
import api from "../../api";
import toast from "react-hot-toast";
import Header from "../Layout/Header.jsx";

function Profile() {
  const userInfo = localStorage.getItem("User");
  const user = JSON.parse(userInfo);
  console.log("user info from local storage:", user);
  const [changePassword, setChangePassword] = useState({
    oldPassword: "",
    newPassword: "",
    newConfirmPassword: "",
  });

  const handleChangePassword = async (e) => {
    e.preventDefault();
    try {
      const res = await api.put(`/change/Password/${user._id}`, changePassword);
      if (res.status === 200) {
        toast.success("Password changed successfully");
        return;
      }
      toast.error("Failed to change password");
    } catch (error) {
      console.log(error);
      if (error.response && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An error occurred");
      }
      // toast.error("An error occurred");
    }
  };
  return (
    <>
    <Header/>
      <div>
        <h1>Welcom {user.name}</h1>
        <div>Email: {user.email}</div>
        <div>Role: {user.role}</div>
        </div>
        <br/>
        <div>
          <h5>Change Password</h5>
          <form onSubmit={handleChangePassword}>
            <input
              type="password"
              placeholder="Old Password"
              onChange={(e) =>
                setChangePassword({
                  ...changePassword,
                  oldPassword: e.target.value,
                })
              }
            />
            <input
              type="password"
              placeholder="New Password"
              onChange={(e) =>
                setChangePassword({
                  ...changePassword,
                  newPassword: e.target.value,
                })
              }
            />
            <input
              type="password"
              placeholder="Confirm New Password"
              onChange={(e) =>
                setChangePassword({
                  ...changePassword,
                  newConfirmPassword: e.target.value,
                })
              }
            />
            <button type="submit">Change</button>
          </form>
          </div>
    </>
  );
}
export default Profile;
