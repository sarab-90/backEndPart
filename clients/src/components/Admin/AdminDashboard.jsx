import React from "react";
import DisplayProduct from "./Products/DisplayProduct.jsx";
import DisplayCategories from "./Categories/DisplayCategories.jsx";
import DisplyUsers from "./Users/DisplayUsers.jsx";

function AdminDashboard (){
    return(
        <>
        <h1>Admin Dashboard</h1>
        <DisplyUsers/>
        <DisplayCategories/>
        <DisplayProduct/>   
        </>) 
}
export default AdminDashboard;