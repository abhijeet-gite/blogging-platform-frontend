import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
  return (
    <nav className="bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-lg">
      <div className="max-w-6xl mx-auto flex justify-between items-center p-4">
        <h1 className="text-2xl font-bold">MyBlog</h1>
        <div className="flex gap-4">
          <Link to="/" className="hover:text-yellow-300">Home</Link>
          <Link to="/create" className="hover:text-yellow-300">Create</Link>
          <Link to="/dashboard" className="hover:text-yellow-300">Dashboard</Link>
          <Link to="/login" className="hover:text-yellow-300">Login</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;