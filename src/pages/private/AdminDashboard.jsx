import React, { useEffect, useState } from "react";
import { FaHome, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import "tailwindcss/tailwind.css";

const AdminDashboard = () => {
  const [activeMenu, setActiveMenu] = useState("manageFlats");
  const [flats, setFlats] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3000/api/rooms")
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched flats:", data);
        setFlats(data);
      })
      .catch((error) => console.error("Error fetching flats:", error));
  }, []);

  const handleEdit = (flatId) => {
    navigate(`/editRoom/${flatId}`);
  };

  const handleDelete = (flatId) => {
    fetch(`http://localhost:3000/api/rooms/${flatId}`, {
      method: "DELETE",
    })
      .then(() => {
        setFlats(flats.filter((flat) => flat._id !== flatId)); // Remove deleted flat from state
        alert("Room deleted successfully");
      })
      .catch((error) => {
        console.error("Error deleting room:", error);
        alert("Failed to delete room");
      });
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("user");
    navigate("/");
  };

  const goToDashboard = () => {
    navigate("/");
  };

  const goToAddProducts = () => {
    navigate("/addRooms");
  };

  const goToProfile = () => {
    navigate("/profile");
  };

  return (
    <div className="flex h-screen">
      <div className="bg-gray-800 text-white w-64 p-6 flex flex-col justify-between">
        <div>
          <h2 className="text-2xl font-semibold mb-8 text-center">
            Admin Dashboard
          </h2>
          <ul className="space-y-4 mt-4">
            <li>
              <button
                onClick={() => setActiveMenu("manageFlats")}
                className={`w-full text-left px-4 py-2 rounded-md hover:bg-gray-700 flex items-center ${
                  activeMenu === "manageFlats" ? "bg-gray-700" : ""
                }`}
              >
                <FaHome className="mr-2" /> Manage Flats
              </button>
            </li>

            <li>
              <button
                onClick={() => navigate("/profile")}
                className="w-full text-left px-4 py-2 rounded-md hover:bg-gray-700 flex items-center"
              >
                <FaUser className="mr-2" /> Customer Details
              </button>
            </li>
          </ul>
        </div>
        <div className="flex justify-between mt-auto space-x-2">
          <button
            onClick={goToDashboard}
            className="w-full px-4 py-2 rounded-md bg-sky-500 hover:bg-sky-600 text-white font-bold"
          >
            Dashboard
          </button>
          <button
            onClick={logout}
            className="w-full px-4 py-2 rounded-md bg-red-600 hover:bg-red-700 text-white font-bold"
          >
            Logout
          </button>
        </div>
      </div>
      <div className="flex-1 p-6 overflow-auto">
        <div className="border-4 border-gray-300 rounded-lg p-6 shadow-lg">
          {activeMenu === "manageFlats" && (
            <div>
              <h3 className="text-2xl font-semibold">Manage Flats</h3>
              <div className="flex justify-end space-x-4 mb-6">
                <button
                  onClick={goToAddProducts}
                  className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white font-bold rounded-md"
                >
                  Add Room
                </button>
              </div>
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
                    <th className="px-4 py-2 border">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {flats.length > 0 ? (
                    flats.map((flat, index) => (
                      <tr key={index} className="bg-white hover:bg-gray-100">
                        <td className="px-4 py-2 border">
                          {flat.roomImage && (
                            <img
                              src={`http://localhost:3000/${flat.roomImage}`} // Ensure the URL is correct
                              alt="Room"
                              className="w-20 h-20 object-cover rounded"
                            />
                          )}
                        </td>
                        <td className="px-4 py-2 border">
                          {flat.roomDescription}
                        </td>
                        <td className="px-4 py-2 border">{flat.floor}</td>
                        <td className="px-4 py-2 border">{flat.address}</td>
                        <td className="px-4 py-2 border">₹{flat.rentPrice}</td>
                        <td className="px-4 py-2 border">{flat.parking}</td>
                        <td className="px-4 py-2 border">{flat.contactNo}</td>
                        <td className="px-4 py-2 border">{flat.bathroom}</td>
                        <td className="px-4 py-2 border">
                          <div className="flex space-x-2">
                            <Link
                              to={{
                                pathname: `/adminUpdate/${flat._id}`,
                                state: { flat },
                              }}
                            >
                              <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
                                Edit
                              </button>
                            </Link>

                            <button
                              onClick={() => handleDelete(flat._id)}
                              className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-bold rounded-md"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="9" className="text-center px-4 py-2">
                        No flats available
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
