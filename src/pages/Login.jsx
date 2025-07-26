import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", { email, password });
      login(res.data.user, res.data.token);
      navigate("/");
    } catch {
      alert("Invalid credentials");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-4 shadow">
      <h2 className="text-xl font-bold mb-4">Login</h2>
      <input type="email" placeholder="Email" className="w-full p-2 mb-2 border"
        value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" className="w-full p-2 mb-2 border"
        value={password} onChange={(e) => setPassword(e.target.value)} />
      <button className="bg-blue-500 text-white w-full p-2">Login</button>
    </form>
  );
}

export default Login;
