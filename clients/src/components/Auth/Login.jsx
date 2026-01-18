import React from "react";
import { useState } from "react";
import api from "../../api.js";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  // handleSubmit >> connect >> backend + api
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // api.post("/auth/login", {email, password}) >> file = server >> authRouters.js
      const response = await api.post("/auth/login", { email, password });
      if (response.status !== 200) {
        toast.error(response.data.message);
      }
      console.log("res.data", response.data);
      const { token, User } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("User", JSON.stringify(User));
      toast.success(response.data.message);

      // role based access => role = adimn or user
      const role = response.data.User.role;
      role === "admin"
        ? navigate("/Admin/Dashboard")
        : navigate("/user/Dashboard");
    } catch (error) {
      // handle error input data
      // ? >> =  ممكن انه لا يوجد فيه
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </>
  );
}

export default Login;
