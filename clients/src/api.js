import React from "react";
import axios from "axios";
// connect to back-end
const api = axios.create({
    baseURL: "http://localhost:5002/api",
    headers: {
        "Content-Type": "application/json",
    },
})


export default api;