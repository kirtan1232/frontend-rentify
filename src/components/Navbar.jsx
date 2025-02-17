import { useEffect, useState } from "react";
import {
  FaCaretDown,
  FaHeart,
  FaSignOutAlt,
  FaUser,
  FaUserEdit,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import logo from "../assets/icons/logo.png";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    // Close dropdown when clicking outside
    const handleClickOutside = (e) => {
      if (!e.target.closest(".user-menu")) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
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
        <Link to="/" className="ml-3 text-xl font-bold">
          Rentify
        </Link>
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
          <div className="relative user-menu">
            <button
              className="flex items-center gap-2 font-bold hover:bg-gray-100 px-3 py-2 rounded cursor-pointer"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <FaUser size={20} />
              {user.name}
              <FaCaretDown />
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div
                className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 border z-50"
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
              >
                <Link
                  to="/edit-profile" // Use user._id from state
                  className="flex items-center w-full px-4 py-2 text-black font-bold hover:bg-gray-100 cursor-pointer block"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  <FaUserEdit className="mr-2" />
                  Edit Profile
                </Link>
                <Link
                  to="/wishlist"
                  className="flex items-center w-full px-4 py-2 text-black font-bold hover:bg-gray-100 cursor-pointer block"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  <FaHeart className="mr-2" />
                  Wishlist
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left flex items-center px-4 py-2 text-black font-bold hover:bg-gray-100 cursor-pointer block"
                >
                  <FaSignOutAlt className="mr-2" />
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link
            to="/login"
            className="bg-green-500 px-4 py-2 rounded-md hover:bg-green-700 font-bold cursor-pointer"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
