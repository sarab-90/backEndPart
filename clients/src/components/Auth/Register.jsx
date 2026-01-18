import React from "react";
import { useState } from "react";
import api from "../../api.js";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Register(){
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post("/auth/register",{name, email, password, confirmPassword});
            if (response.status !== 201) {
                toast.error(response.data.message);
                return;
            }
            toast.success(response.data.message) 

            navigate('/login');

        } catch (error) {
            toast.error(error.response?.data?.message || 'Register failed');
        }
    }
    return(
        <>
            <div>Register</div>
            <form onSubmit={handleRegister}>
                <div>
                    <label htmlFor="name">Name</label>
                    <input type="text" 
                    id="name"
                    name="name"
                    value={name}
                    onChange={(e) => (setName(e.target.value))}
                    required/>
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="email" 
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => (setEmail(e.target.value))}
                    required/>
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" 
                    id="password"
                    name="password"
                    value={password}
                    onChange={(e) => (setPassword(e.target.value))}
                    required/>
                </div>
                <div>
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input type="password" 
                    id="confirmPassword"
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => (setConfirmPassword (e.target.value))}
                    required/>
                </div>
                <button type="submit">Register</button>
            </form>
        </>
    )
}

export default Register;