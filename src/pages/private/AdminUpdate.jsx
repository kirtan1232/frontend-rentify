import React, { useEffect, useState } from "react";
import { FaHome, FaPlus } from "react-icons/fa";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const AdminUpdate = () => {
  const { id } = useParams(); // Room ID from URL
  const navigate = useNavigate();
  const { state } = useLocation(); // State passed from the previous page
  const { flat } = state || {}; // Current flat details

  const [formData, setFormData] = useState({
    roomImage: "",
    roomDescription: "",
    floor: "",
    address: "",
    rentPrice: "",
    parking: "",
    contactNo: "",
    bathroom: "",
  });

  const [selectedImage, setSelectedImage] = useState(null); // For the selected image
  const [loading, setLoading] = useState(true); // State to handle loading text

  // Populate the form with existing data when the page loads
  useEffect(() => {
    if (flat) {
      // Construct the full image URL if it's a relative path
      const roomImage = flat.roomImage
        ? `http://localhost:3000/${flat.roomImage}`
        : "";

      setFormData({
        roomImage: roomImage, // Use the full URL
        roomDescription: flat.roomDescription || "",
        floor: flat.floor || "",
        address: flat.address || "",
        rentPrice: flat.rentPrice || "",
        parking: flat.parking || "",
        contactNo: flat.contactNo || "",
        bathroom: flat.bathroom || "",
      });
      setLoading(false);
    } else {
      fetch(`http://localhost:3000/api/rooms/${id}`)
        .then((res) => res.json())
        .then((data) => {
          // Construct the full image URL if it's a relative path
          const roomImage = data.roomImage
            ? `http://localhost:3000/${data.roomImage}`
            : "";

          setFormData({
            roomImage: roomImage, // Use the full URL
            roomDescription: data.roomDescription || "",
            floor: data.floor || "",
            address: data.address || "",
            rentPrice: data.rentPrice || "",
            parking: data.parking || "",
            contactNo: data.contactNo || "",
            bathroom: data.bathroom || "",
          });
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching room details:", error);
          setLoading(false);
        });
    }
  }, [flat, id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setFormData({ ...formData, roomImage: URL.createObjectURL(file) });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataToSend.append(key, formData[key]);
    });
    if (selectedImage) {
      formDataToSend.append("roomImage", selectedImage);
    }

    try {
      const response = await fetch(`http://localhost:3000/api/rooms/${id}`, {
        method: "PUT",
        body: formDataToSend,
      });

      if (response.ok) {
        alert("Room updated successfully");
        navigate("/adminDash");
      } else {
        alert("Failed to update room");
      }
    } catch (error) {
      console.error("Error updating room:", error);
    }
  };

  return (
    <div className="flex">
      {/* Left Menu Bar */}
      <div className="bg-gray-800 text-white w-64 p-6 flex flex-col justify-between min-h-screen">
        <div>
          <h2 className="text-2xl font-semibold mb-8 text-center">
            Admin Dashboard
          </h2>
          <ul className="space-y-4 mt-4">
            <li>
              <button
                onClick={() => navigate("/adminDash")}
                className="w-full text-left px-4 py-2 rounded-md hover:bg-gray-700 flex items-center"
              >
                <FaHome className="mr-2" /> Home
              </button>
            </li>
            <li>
              <button
                onClick={() => navigate("/addRooms")}
                className="w-full text-left px-4 py-2 rounded-md hover:bg-gray-700 flex items-center"
              >
                <FaPlus className="mr-2" /> Add Rooms
              </button>
            </li>
          </ul>
        </div>

        <div className="flex justify-between mt-auto space-x-2">
          <button
            onClick={() => navigate("/")}
            className="w-full text-left px-4 py-2 rounded-md bg-sky-500 hover:bg-sky-600 text-white font-bold"
          >
            Dashboard
          </button>
          <button
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("isAdmin");
              localStorage.removeItem("user");
              navigate("/login");
            }}
            className="w-full text-left px-4 py-2 rounded-md bg-red-600 hover:bg-red-700 text-white font-bold"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Update Room Form */}
      <div className="flex-1 p-6 overflow-auto bg-gray-100">
        <div className="border-4 border-gray-300 rounded-lg p-6 shadow-lg">
          <h3 className="text-2xl font-semibold mb-6 text-center">
            {loading ? "Loading Room Details..." : "Update Room Details"}
          </h3>
          {loading ? (
            <div className="text-center text-gray-600">
              Please wait while we load the room details...
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Room Image Upload */}
              <div>
                <label className="block text-gray-600">Room Image</label>
                <input
                  type="file"
                  name="roomImage"
                  onChange={handleImageChange}
                  className="w-full p-1 border rounded mt-1 text-sm"
                />
                {formData.roomImage && (
                  <img
                    src={formData.roomImage}
                    alt="Room Preview"
                    className="mt-2 w-32 h-32 object-cover rounded"
                  />
                )}
              </div>

              {/* Dynamic Form Fields */}
              {Object.keys(formData)
                .filter((key) => key !== "roomImage")
                .map((key) => (
                  <div key={key} className="flex flex-col space-y-2">
                    <label className="text-gray-600">
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                    </label>
                    {key === "rentPrice" ? (
                      <input
                        type="number"
                        name={key}
                        value={formData[key]}
                        onChange={handleChange}
                        className="w-96 p-2 border rounded mt-1 text-sm"
                      />
                    ) : key === "contactNo" ? (
                      <input
                        type="tel"
                        name={key}
                        value={formData[key]}
                        onChange={handleChange}
                        className="w-96 p-2 border rounded mt-1 text-sm"
                        maxLength="10"
                      />
                    ) : key === "parking" ? (
                      <select
                        name={key}
                        value={formData[key]}
                        onChange={handleChange}
                        className="w-96 p-2 border rounded mt-1 text-sm"
                      >
                        <option value="">Select Parking</option>
                        <option value="Available">Available</option>
                        <option value="Not Available">Not Available</option>
                      </select>
                    ) : key === "floor" ? (
                      <select
                        name={key}
                        value={formData[key]}
                        onChange={handleChange}
                        className="w-96 p-2 border rounded mt-1 text-sm"
                      >
                        <option value="">Select Floor</option>
                        {[1, 2, 3, 4].map((floor) => (
                          <option key={floor} value={floor}>
                            {floor}
                          </option>
                        ))}
                      </select>
                    ) : key === "bathroom" ? (
                      <select
                        name={key}
                        value={formData[key]}
                        onChange={handleChange}
                        className="w-96 p-2 border rounded mt-1 text-sm"
                      >
                        <option value="">Select Bathroom</option>
                        {[1, 2, 3].map((bathroom) => (
                          <option key={bathroom} value={bathroom}>
                            {bathroom}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type="text"
                        name={key}
                        value={formData[key]}
                        onChange={handleChange}
                        className="w-96 p-2 border rounded mt-1 text-sm"
                      />
                    )}
                  </div>
                ))}
              <button
                type="submit"
                className="w-48 bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition text-sm mx-auto block"
              >
                Update Room
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminUpdate;
