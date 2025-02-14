import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "tailwindcss/tailwind.css"; // Import Tailwind CSS

const AdminDashboard = () => {
  const [activeMenu, setActiveMenu] = useState("manageFlats"); // Active menu state
  const navigate = useNavigate();

  // Function to handle logout
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("user");
    navigate("/login");
  };

  // Function to navigate to the home page
  const goToDashboard = () => {
    navigate("/");
  };
  // Function to handle Add button click
  const goToAddProducts = () => {
    navigate("/addProducts"); // Redirect to /addPrducts
  };
  // Function to handle Add button click
  const goToAdminUpdate = () => {
    navigate("/adminUpdate"); // Redirect to /adminupdate
  };

  // Sample flat data (This can be dynamically fetched from an API or database)
  const flatData = [
    {
      roomImage: "https://via.placeholder.com/150",
      roomDescription: "Spacious 2BHK apartment with modern amenities.",
      floor: "2nd",
      address: "Kathmandu 44600, Nepal",
      rentPrice: "₹30,000",
      parking: "Yes",
      contactNo: "+977-980124545",
      bathroom: "2",
    },
    {
      roomImage: "https://via.placeholder.com/150",
      roomDescription: "Cozy 1BHK apartment in a quiet neighborhood.",
      floor: "3rd",
      address: "Kathmandu 44600, Nepal",
      rentPrice: "₹20,000",
      parking: "No",
      contactNo: "+977-980124546",
      bathroom: "1",
    },
  ];

  return (
    <div className="flex h-screen">
      {/* Left Menu Bar */}
      <div className="bg-gray-800 text-white w-64 p-6 flex flex-col justify-between">
        <div>
          <h2 className="text-2xl font-semibold mb-8 text-center">
            Admin Dashboard
          </h2>
          <ul className="space-y-4 mt-4">
            <li>
              <button
                onClick={() => setActiveMenu("manageFlats")}
                className={`w-full text-left px-4 py-2 rounded-md hover:bg-gray-700 ${
                  activeMenu === "manageFlats" ? "bg-gray-700" : ""
                }`}
              >
                Manage Flats
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveMenu("bookings")}
                className={`w-full text-left px-4 py-2 rounded-md hover:bg-gray-700 ${
                  activeMenu === "bookings" ? "bg-gray-700" : ""
                }`}
              >
                Bookings
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveMenu("userProfile")}
                className={`w-full text-left px-4 py-2 rounded-md hover:bg-gray-700 ${
                  activeMenu === "userProfile" ? "bg-gray-700" : ""
                }`}
              >
                User Profile
              </button>
            </li>
          </ul>
        </div>

        {/* Dashboard and Logout Buttons */}
        <div className="flex justify-between mt-auto space-x-2">
          <button
            onClick={goToDashboard}
            className="w-full text-left px-4 py-2 rounded-md bg-sky-500 hover:bg-sky-600 text-white font-bold"
          >
            Dashboard
          </button>
          <button
            onClick={logout}
            className="w-full text-left px-4 py-2 rounded-md bg-red-600 hover:bg-red-700 text-white font-bold"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Right Content Section */}
      <div className="flex-1 p-6 overflow-auto">
        <div className="border-4 border-gray-300 rounded-lg p-6 shadow-lg">
          {/* Frame Section */}
          <div>
            {activeMenu === "manageFlats" && (
              <div>
                <h3 className="text-2xl font-semibold">Manage Flats</h3>

                {/* Buttons for Add, Edit, and Delete on the Right Side */}
                <div className="flex justify-end space-x-4 mb-6">
                  <button
                    onClick={goToAddProducts} // Call the function to navigate to /adminupdate
                    className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white font-bold rounded-md"
                  >
                    Add
                  </button>
                  <button
                    onClick={goToAdminUpdate} // Call the function to navigate to /adminupdate
                    className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-md"
                  >
                    Edit
                  </button>
                  <button className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-bold rounded-md">
                    Delete
                  </button>
                </div>

                {/* Flat Data Table */}
                <table className="min-w-full mt-6 border-collapse">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="px-4 py-2 border">Room Image</th>
                      <th className="px-4 py-2 border">Room Description</th>
                      <th className="px-4 py-2 border">Floor</th>
                      <th className="px-4 py-2 border">Address</th>
                      <th className="px-4 py-2 border">Rent Price</th>
                      <th className="px-4 py-2 border">Parking</th>
                      <th className="px-4 py-2 border">Contact No</th>
                      <th className="px-4 py-2 border">Bathroom</th>
                    </tr>
                  </thead>
                  <tbody>
                    {flatData.map((flat, index) => (
                      <tr key={index} className="bg-white hover:bg-gray-100">
                        <td className="px-4 py-2 border">
                          <img
                            src={flat.roomImage}
                            alt="Room"
                            className="w-20 h-20 object-cover rounded"
                          />
                        </td>
                        <td className="px-4 py-2 border">
                          {flat.roomDescription}
                        </td>
                        <td className="px-4 py-2 border">{flat.floor}</td>
                        <td className="px-4 py-2 border">{flat.address}</td>
                        <td className="px-4 py-2 border">{flat.rentPrice}</td>
                        <td className="px-4 py-2 border">{flat.parking}</td>
                        <td className="px-4 py-2 border">{flat.contactNo}</td>
                        <td className="px-4 py-2 border">{flat.bathroom}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            {activeMenu === "bookings" && (
              <div>
                <h3 className="text-2xl font-semibold">Bookings</h3>
                <p className="mt-2">View and manage customer bookings here.</p>
                {/* Add more content related to bookings */}
              </div>
            )}
            {activeMenu === "userProfile" && (
              <div>
                <h3 className="text-2xl font-semibold">User Profile</h3>
                <p className="mt-2">
                  Update user profile and preferences here.
                </p>
                {/* Add more content related to the user profile */}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
