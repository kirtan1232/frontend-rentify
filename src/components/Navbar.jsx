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
        <h1 className="ml-3 text-xl font-bold">Rentify</h1>
      </div>

      <div className="flex-1 flex justify-center space-x-8">
        <Link to="/" className="text-black text-lg font-bold hover:underline">
          Home
        </Link>
        <Link
          to="/aboutus"
          className="text-black text-lg font-bold hover:underline"
        >
          About
        </Link>
        <Link
          to="/contactus"
          className="text-black text-lg font-bold hover:underline"
        >
          Contact
        </Link>

        {/* Admin Dashboard Link (Only visible to admin users) */}
        {user?.role === "admin" && (
          <Link
            to="/admindash"
            className="text-black text-lg font-bold hover:underline"
          >
            Admin Dashboard
          </Link>
        )}
      </div>

      <div className="flex items-center gap-4">
        {/* Login/Logout Buttons */}
        {user ? (
          <div className="flex items-center justify-between gap-4">
            <button className="text-black flex items-center gap-2 font-bold">
              <FaUser size={20} />
              {user.name}
            </button>
            <button
              onClick={handleLogout}
              className="bg-red-500 px-4 py-2 rounded-md hover:bg-red-700 font-bold"
            >
              Logout
            </button>
          </div>
        ) : (
          <Link
            to="/login"
            className="bg-green-500 px-4 py-2 rounded-md hover:bg-green-700 font-bold"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
