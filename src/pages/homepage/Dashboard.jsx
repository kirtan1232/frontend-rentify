import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify"; // Importing toastify
import "react-toastify/dist/ReactToastify.css"; // Import CSS for Toastify
import Footer from "../../components/Footer.jsx"; // Ensure the path is correct
import Navbar from "../../components/Navbar.jsx"; // Ensure the path is correct

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
      toast.success(`Welcome back, ${storedUser.name}!`); // Add toast on successful login
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
    toast.info("You have logged out."); // Optional: Add a toast on logout
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Pass user and logout to Navbar */}
      <Navbar user={user} logout={logout} />

      {/* Dashboard Content */}
      <div className="flex-grow pt-20 px-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-white shadow-md rounded-lg">
            <h3 className="text-xl font-semibold">Manage Flats</h3>
            <p className="text-gray-600">Add, edit, and delete listings.</p>
          </div>
          <div className="p-6 bg-white shadow-md rounded-lg">
            <h3 className="text-xl font-semibold">Bookings</h3>
            <p className="text-gray-600">View and manage bookings.</p>
          </div>
          <div className="p-6 bg-white shadow-md rounded-lg">
            <h3 className="text-xl font-semibold">User Profile</h3>
            <p className="text-gray-600">
              Update your profile and preferences.
            </p>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <Footer />
    </div>
  );
};

export default Dashboard;
