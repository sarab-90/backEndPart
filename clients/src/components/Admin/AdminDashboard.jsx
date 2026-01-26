import React, {useState} from "react";
import Header from "../Layout/Header.jsx";
import Footer from "../Layout/Footer.jsx";
import SideBar from "../SideBar/SideBar.jsx";
import "./AdminDashboard.css";

function AdminDashboard() {
  const[isSidebarOpen, setIsSidebarOpen]= useState(true);

  // Function to toggle sidebar
const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
};
  return (
    <>
      <Header />
      <div className="admin-layout">
        <SideBar isOpen={isSidebarOpen}/>

        <div className="admin-content">
        <button onClick={toggleSidebar}>
          {isSidebarOpen ? 'Hide ' : 'Show '}
          </button>
          <br/>
        <h4>Admin Dashboard</h4>
        </div>
      </div>
      <Footer />
    </>
  );
}
export default AdminDashboard;
