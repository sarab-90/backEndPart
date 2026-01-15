import React from "react";
import { useNavigate } from "react-router-dom";

function LandingHome(){
    const navigate = useNavigate();
    const handleLogin = ()=> {
        navigate("/login")
    };
    const handleRegister = ()=> {
        navigate("/register");
    };


    return (
        <>
            <div>Hello, this is our store</div>
            <p>login or register to check our products</p>

            <button onClick={handleLogin}>Login</button>
            <button onClick={handleRegister}>Register</button>
        </>
    );
}

export default LandingHome;