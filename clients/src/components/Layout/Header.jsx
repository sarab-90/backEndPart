import React from "react";  
import './Header.css';
import {useNavigate} from 'react-router-dom';

function Header() {
    const navigate = useNavigate();
    return(
        <header className="header">
            <div className="logo" >logo</div>
            <nav className="nav">
                <button onClick={() => navigate("/Admin/Dashboard")}>Home</button>
                <button onClick={() => navigate("/Admin/Dashboard/users")}>Users</button>
                <button onClick={() => navigate("/Admin/Dashboard/products")}>Products</button>
                <button onClick={() => navigate("/Admin/Dashboard/categories")}>Categories</button>
                <button onClick={() => navigate("/About")}>About</button>
            </nav>
        </header>
    )
}
export default Header;