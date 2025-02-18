import axios from "axios";
import React, { useState } from "react";
import { FaHome, FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify"; // Importing toastify
import "react-toastify/dist/ReactToastify.css"; // Importing the Toastify styles
import "tailwindcss/tailwind.css";

const AddRooms = () => {
  const [roomDetails, setRoomDetails] = useState({
    roomDescription: "",
    floor: "",
    address: "",
    rentPrice: "",
    parking: "",
    contactNo: "",
    bathroom: "",
    roomImage: null, // To store the uploaded image
  });
  const navigate = useNavigate();

  // Handle form field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRoomDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setRoomDetails((prevDetails) => ({
      ...prevDetails,
      roomImage: file, // Store the uploaded image file
    }));
  };

  // Handle phone number input (only allow digits)
  const handlePhoneChange = (e) => {
    const value = e.target.value;
    // Allow only digits and restrict the length to 10 characters
    if (/^\d{0,10}$/.test(value)) {
      setRoomDetails((prevDetails) => ({
        ...prevDetails,
        contactNo: value,
      }));
    }
  };
  // Handle rent price input (only allow numbers)
  const handleRentPriceChange = (e) => {
    const value = e.target.value;
    // Allow only numbers and restrict the length to a valid range (e.g., max 7 digits)
    if (/^\d{0,7}$/.test(value)) {
      setRoomDetails((prevDetails) => ({
        ...prevDetails,
        rentPrice: value,
      }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation check
    if (
      !roomDetails.roomDescription ||
      !roomDetails.floor ||
      !roomDetails.address ||
      !roomDetails.rentPrice ||
      !roomDetails.contactNo
    ) {
      toast.error("Please fill out all required fields.");
      return;
    }

    if (roomDetails.contactNo.length !== 10) {
      toast.error("Contact number must be exactly 10 digits.");
      return;
    }

    const formData = new FormData();
    formData.append("roomDescription", roomDetails.roomDescription);
    formData.append("floor", roomDetails.floor);
    formData.append("address", roomDetails.address);
    formData.append("rentPrice", roomDetails.rentPrice);
    formData.append("parking", roomDetails.parking);
    formData.append("contactNo", roomDetails.contactNo);
    formData.append("bathroom", roomDetails.bathroom);
    if (roomDetails.roomImage) {
      formData.append("roomImage", roomDetails.roomImage);
    }

    try {
      // Post room details to backend
      await axios.post("http://localhost:3000/api/rooms", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Required for image upload
        },
      });

      toast.success("Room added successfully!");
      navigate("/adminDash"); // Navigate back to the admin dashboard after submission
    } catch (error) {
      console.error("Error adding room:", error);
      toast.error("Error adding room. Please try again.");
    }
  };

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
                onClick={() => navigate("/adminDash")}
                className="w-full text-left px-4 py-2 rounded-md hover:bg-gray-700 flex items-center"
              >
                <FaHome className="mr-2" /> Home
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

        {/* Dashboard and Logout Buttons */}
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

      {/* Right Content Section */}
      <div className="flex-1 p-6 overflow-auto">
        <div className="border-4 border-gray-300 rounded-lg p-6 shadow-lg">
          <h3 className="text-2xl font-semibold mb-6">Add New Room</h3>

          <form onSubmit={handleSubmit}>
            {/* Room Image */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Room Image
              </label>
              <input
                type="file"
                name="roomImage"
                onChange={handleImageUpload}
                className="mt-2 p-3 w-full border border-gray-300 rounded-md"
                accept="image/*"
              />
              {roomDetails.roomImage && (
                <div className="mt-4">
                  <img
                    src={URL.createObjectURL(roomDetails.roomImage)}
                    alt="Room preview"
                    className="w-32 h-32 object-cover rounded-md"
                  />
                </div>
              )}
            </div>

            {/* Room Description */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Room Description
              </label>
              <input
                type="text"
                name="roomDescription"
                value={roomDetails.roomDescription}
                onChange={handleInputChange}
                className="mt-2 p-3 w-full border border-gray-300 rounded-md"
                placeholder="Enter room description"
              />
            </div>

            {/* Floor */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Floor
              </label>
              <select
                name="floor"
                value={roomDetails.floor}
                onChange={handleInputChange}
                className="mt-2 p-3 w-full border border-gray-300 rounded-md"
              >
                <option value="">Select floor</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </select>
            </div>

            {/* Address */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Address
              </label>
              <input
                type="text"
                name="address"
                value={roomDetails.address}
                onChange={handleInputChange}
                className="mt-2 p-3 w-full border border-gray-300 rounded-md"
                placeholder="Enter address"
              />
            </div>

            {/* Rent Price */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Rent Price
              </label>
              <input
                type="text"
                name="rentPrice"
                value={roomDetails.rentPrice}
                onChange={handleRentPriceChange} // Handle rent price change
                className="mt-2 p-3 w-full border border-gray-300 rounded-md"
                placeholder="Enter rent price"
              />
            </div>

            {/* Parking */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Parking
              </label>
              <select
                name="parking"
                value={roomDetails.parking}
                onChange={handleInputChange}
                className="mt-2 p-3 w-full border border-gray-300 rounded-md"
              >
                <option value="">Select parking availability</option>
                <option value="available">Available</option>
                <option value="not available">Not Available</option>
              </select>
            </div>

            {/* Contact No */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Contact No
              </label>
              <input
                type="text"
                name="contactNo"
                value={roomDetails.contactNo}
                onChange={handlePhoneChange} // Only allow digits
                className="mt-2 p-3 w-full border border-gray-300 rounded-md"
                placeholder="Enter contact number"
              />
            </div>

            {/* Bathroom */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Bathroom
              </label>
              <select
                name="bathroom"
                value={roomDetails.bathroom}
                onChange={handleInputChange}
                className="mt-2 p-3 w-full border border-gray-300 rounded-md"
              >
                <option value="">Select number of bathrooms</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </select>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-bold rounded-md"
            >
              Add Room
            </button>
          </form>
        </div>
      </div>

      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
};

export default AddRooms;
