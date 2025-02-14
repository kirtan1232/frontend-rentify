import { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import logo from "../assets/icons/logo.png";

const Navbar = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    window.location.reload();
  };

  return (
    <nav className="bg-white p-4 text-black flex justify-between items-center shadow-md">
      <div className="flex items-center">
        <img src={logo} alt="Logo" className="h-10 w-auto" />
        <h1 className="ml-3 text-2xl font-bold">Flat Rental</h1>
      </div>

      {/* Centered Links Section */}
      <div className="flex flex-1 justify-center space-x-6">
        <Link to="/" className="text-lg font-bold hover:underline">
          Home
        </Link>
        <Link to="/about" className="text-lg font-bold hover:underline">
          About
        </Link>
        <Link to="/contact" className="text-lg font-bold hover:underline">
          Contact
        </Link>
      </div>

      {/* Right Section: Profile and Logout */}
      <div className="flex items-center gap-4">
        {user ? (
          <>
            <button className="text-lg font-bold text-black flex items-center gap-2">
              <FaUser size={20} />
              {user.name}
            </button>
            <button
              onClick={handleLogout}
              className="bg-red-500 px-4 py-2 rounded-md hover:bg-red-700"
            >
              Logout
            </button>
          </>
        ) : (
          <Link
            to="/login"
            className="text-lg font-bold bg-green-500 px-4 py-2 rounded-md hover:bg-green-700"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
