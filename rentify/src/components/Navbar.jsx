import React, { useEffect, useRef, useState } from "react";
import { FaHome, FaUser } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/icons/logo.png";

const Navbar = () => {
    const navigate = useNavigate();
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef(null);
    const isAuthenticated = localStorage.getItem("token");

    const logout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    // Toggle dropdown visibility
    const toggleDropdown = () => {
        setShowDropdown((prev) => !prev);
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        };

        document.addEventListener("mousedown", handleOutsideClick);
        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, []);

    return (
        <>
            <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
                <div className="flex justify-between items-center px-6 py-4">
                    {/* Logo Section */}
                    <div className="flex items-center">
                        <img
                            src={logo} // Add your logo source here
                            alt="Logo"
                            className="h-10 w-auto"
                        />
                        <h1 className="ml-3 text-xl font-bold text-gray-800">Rentify</h1>
                    </div>

                    {/* Navigation Links */}
                    <ul className="hidden md:flex gap-6">
                        <li>
                            <NavLink
                                to="/"
                                className={({ isActive }) =>
                                    `relative font-medium text-lg text-black hover:text-blue-600 ${isActive
                                        ? "font-bold text-black after:content-[''] after:w-full after:h-0.5 after:bg-black after:absolute after:bottom-0 after:left-0"
                                        : "hover:after:w-full hover:after:h-0.5 hover:after:bg-blue-600 hover:after:absolute hover:after:bottom-0 hover:after:left-0"
                                    }`
                                }
                            >
                                Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/find-room"
                                className={({ isActive }) =>
                                    `relative font-medium text-lg text-black hover:text-blue-600 ${isActive
                                        ? "font-bold text-black after:content-[''] after:w-full after:h-0.5 after:bg-black after:absolute after:bottom-0 after:left-0"
                                        : "hover:after:w-full hover:after:h-0.5 hover:after:bg-blue-600 hover:after:absolute hover:after:bottom-0 hover:after:left-0"
                                    }`
                                }
                            >
                                Find me room
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/notifications"
                                className={({ isActive }) =>
                                    `relative font-medium text-lg text-black hover:text-blue-600 ${isActive
                                        ? "font-bold text-black after:content-[''] after:w-full after:h-0.5 after:bg-black after:absolute after:bottom-0 after:left-0"
                                        : "hover:after:w-full hover:after:h-0.5 hover:after:bg-blue-600 hover:after:absolute hover:after:bottom-0 hover:after:left-0"
                                    }`
                                }
                            >
                                Notifications
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/about"
                                className={({ isActive }) =>
                                    `relative font-medium text-lg text-black hover:text-blue-600 ${isActive
                                        ? "font-bold text-black after:content-[''] after:w-full after:h-0.5 after:bg-black after:absolute after:bottom-0 after:left-0"
                                        : "hover:after:w-full hover:after:h-0.5 hover:after:bg-blue-600 hover:after:absolute hover:after:bottom-0 hover:after:left-0"
                                    }`
                                }
                            >
                                About us
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/settings"
                                className={({ isActive }) =>
                                    `relative font-medium text-lg text-black hover:text-blue-600 ${isActive
                                        ? "font-bold text-black after:content-[''] after:w-full after:h-0.5 after:bg-black after:absolute after:bottom-0 after:left-0"
                                        : "hover:after:w-full hover:after:h-0.5 hover:after:bg-blue-600 hover:after:absolute hover:after:bottom-0 hover:after:left-0"
                                    }`
                                }
                            >
                                Settings
                            </NavLink>
                        </li>
                    </ul>

                    {/* Profile Section */}
                    <div className="flex items-center gap-4 relative transform -translate-x-2">
                        {isAuthenticated ? (
                            <>
                                {/* Profile Icon */}
                                <button
                                    className="text-gray-700 hover:text-gray-900 cursor-pointer"
                                    onClick={toggleDropdown}
                                >
                                    <FaUser size={25} />
                                </button>
                                {showDropdown && (
                                    <ul
                                        ref={dropdownRef}
                                        className="absolute left-0 top-12 bg-white rounded-lg shadow-md w-48 text-gray-700 z-50"
                                    >
                                        <li>
                                            <NavLink
                                                to="/profile"
                                                className="block px-4 py-2 hover:bg-gray-100"
                                            >
                                                Profile
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink
                                                to="/my-order"
                                                className="block px-4 py-2 hover:bg-gray-100"
                                            >
                                                My Order
                                            </NavLink>
                                        </li>
                                        <li>
                                            <button
                                                onClick={logout}
                                                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                                            >
                                                Logout
                                            </button>
                                        </li>
                                    </ul>
                                )}
                            </>
                        ) : (
                            <NavLink
                                to="/register"
                                className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600"
                            >
                                SignUp
                            </NavLink>
                        )}
                        <NavLink to="/cart" className="hover:text-gray-900">
                            <FaHome size={25} />
                        </NavLink>
                    </div>
                </div>
            </nav>

            {/* Push content below navbar */}
            <div className="pt-20"></div>
        </>
    );
};

export default Navbar;
