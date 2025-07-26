import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/auth/register", { username, email, password });
      navigate("/login");
    } catch {
      alert("Registration failed");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-4 shadow">
      <h2 className="text-xl font-bold mb-4">Register</h2>
      <input type="text" placeholder="Username" className="w-full p-2 mb-2 border"
        value={username} onChange={(e) => setUsername(e.target.value)} />
      <input type="email" placeholder="Email" className="w-full p-2 mb-2 border"
        value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" className="w-full p-2 mb-2 border"
        value={password} onChange={(e) => setPassword(e.target.value)} />
      <button className="bg-blue-500 text-white w-full p-2">Register</button>
    </form>
  );
}

export default Register;
