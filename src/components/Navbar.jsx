
import { useState, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      logout();
      navigate("/");
    }
  };

  const handleMenuClick = () => setMenuOpen(false);

  const isActive = (path) => (location.pathname === path ? "text-yellow-300" : "");

  return (
    <nav className="bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* ✅ Logo */}
        <h1 className="text-2xl font-bold">
          <Link to="/" onClick={handleMenuClick}>MyBlog</Link>
        </h1>

        {/* ✅ Desktop Menu */}
        <div className="hidden md:flex gap-6 text-lg font-medium">
          <Link to="/" className={`hover:text-yellow-300 ${isActive("/")}`}>Home</Link>
          {user && (
            <Link to="/create" className={`hover:text-yellow-300 ${isActive("/create")}`}>Create</Link>
          )}
          {user ? (
            <>
              <Link to="/dashboard" className={`hover:text-yellow-300 ${isActive("/dashboard")}`}>Dashboard</Link>
              <button
                onClick={handleLogout}
                className="hover:text-yellow-300 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className={`hover:text-yellow-300 ${isActive("/login")}`}>Login</Link>
          )}
        </div>

        {/* ✅ Mobile Menu Button */}
        <button
          className="md:hidden text-3xl focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "✖" : "☰"}
        </button>
      </div>

      {/* ✅ Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-purple-700 px-4 py-3 space-y-3 transition-all duration-300 ease-in-out">
          <Link to="/" className="block" onClick={handleMenuClick}>Home</Link>
          {user && (
            <Link to="/create" className="block" onClick={handleMenuClick}>Create</Link>
          )}
          {user ? (
            <>
              <Link to="/dashboard" className="block" onClick={handleMenuClick}>Dashboard</Link>
              <button
                onClick={() => { handleLogout(); handleMenuClick(); }}
                className="block"
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="block" onClick={handleMenuClick}>Login</Link>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;

