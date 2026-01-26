import React from "react";
import { useNavigate } from "react-router-dom";
import "./SideBar.css";
import api from "../../api";
import toast from "react-hot-toast";

function SideBar({ isOpen }) {
  const navigate = useNavigate();
  // get user info from local storage
  const userInfo = localStorage.getItem("User");

  const user = JSON.parse(userInfo);
  console.log("user info from local storage:", user);

  const handlLogout = async () => {
    try {
      await api.post("/auth/logout");
      toast.success("Logged out successfully");
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
        <div className="sidebar-header">
          <h2>
            name : <br/>{user.name} <br/>
            <br/>email :<br/>{user.email} <br/>
            <br/>role :<br/>{user.role}
          </h2>
        </div>
        <div className="sidebar-list">
          <ul>
            <li>
              <button onClick={() => navigate("/Admin/Dashboard")}>
                Dashboard
              </button>
            </li>
            <li>
              <button onClick={() => navigate("/profile")}>Profile</button>
            </li>
            <li>
              <button onClick={() => navigate("/Admin/Dashboard/users")}>
                Users
              </button>
            </li>
            <li>
              <button onClick={() => navigate("/Admin/Dashboard/products")}>
                Products
              </button>
            </li>
            <li>
              <button onClick={() => navigate("/Admin/Dashboard/categories")}>
                Categories
              </button>
            </li>
          </ul>
          <button onClick={handlLogout}>Logout</button>
        </div>
      </div>
    </>
  );
}
export default SideBar;
