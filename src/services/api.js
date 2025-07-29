//client//src//services//api.js

import axios from "axios";

const API = axios.create({
  baseURL: "https://your-backend.onrender.com/api", // ✅ Render backend link
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;

