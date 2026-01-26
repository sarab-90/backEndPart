import React from "react";  
import './Header.css';
import {useNavigate} from 'react-router-dom';
import api from "../../api";
import toast from "react-hot-toast";

function Header() {
    const navigate = useNavigate();

    const handlLogout = async () => {
        try {
            await api.post('/auth/logout');
            toast.success("Logged out successfully");
            navigate('/login');
        } catch (error) {
            console.log(error);
        }
    }
    return(
        <header className="header">
            <div className="logo" >logo</div>
            <nav className="nav">
                <button onClick={() => navigate("/Admin/Dashboard")}>Home</button>
                <button onClick={() => navigate("/Admin/Dashboard/users")}>Users</button>
                <button onClick={() => navigate("/Admin/Dashboard/products")}>Products</button>
                <button onClick={() => navigate("/Admin/Dashboard/categories")}>Categories</button>
                <button onClick={() => navigate("/About")}>About</button>
                <button onClick={handlLogout}>Logout</button>
            </nav>
        </header>
    )
}
export default Header;