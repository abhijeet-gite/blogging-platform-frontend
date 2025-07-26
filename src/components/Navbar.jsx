import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/"); // ✅ Logout झाल्यावर Home ला redirect
  };

  const handleMenuClick = () => setMenuOpen(false); // ✅ Mobile menu auto close

  return (
    <nav className="bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-lg">
      <div className="container mx-auto flex justify-between items-center p-4">
        <h1 className="text-2xl font-bold">
          <Link to="/" onClick={handleMenuClick}>MyBlog</Link>
        </h1>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6">
          <Link to="/" className="hover:text-yellow-300">Home</Link>
          {user && <Link to="/create" className="hover:text-yellow-300">Create</Link>}
          {user ? (
            <>
              <Link to="/dashboard" className="hover:text-yellow-300">Dashboard</Link>
              <button onClick={handleLogout} className="hover:text-yellow-300">Logout</button>
            </>
          ) : (
            <Link to="/login" className="hover:text-yellow-300">Login</Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden bg-purple-700 px-4 py-3 space-y-2">
          <Link to="/" className="block" onClick={handleMenuClick}>Home</Link>
          {user && <Link to="/create" className="block" onClick={handleMenuClick}>Create</Link>}
          {user ? (
            <>
              <Link to="/dashboard" className="block" onClick={handleMenuClick}>Dashboard</Link>
              <button onClick={() => { handleLogout(); handleMenuClick(); }} className="block">Logout</button>
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

