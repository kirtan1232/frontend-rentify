// Sidebar.jsx
import React from "react";
import { Link } from "react-router-dom";

const Sidebar = ({ isSidebarOpen, toggleSidebar }) => {
  return (
    <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
      <button className="btn btn-close" onClick={toggleSidebar}>
        X
      </button>
      <ul className="sidebar-menu">
        <li>
          <Link to="/admin">Admin</Link>
        </li>
        <li>
          <Link to="/contact">Contact</Link>
        </li>
        <li>
          <Link to="/booking">Booking</Link>
        </li>
        <li>
          <Link to="/">Home</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
