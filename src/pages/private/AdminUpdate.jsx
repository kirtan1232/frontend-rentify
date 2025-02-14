import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Footer from "../../components/Footer.jsx"; // Ensure the path is correct

const AdminUpdate = () => {
  const { id } = useParams(); // Get product ID from URL params
  const navigate = useNavigate();
   

  const [form, setForm] = useState({
    roomImage: null,
    previewImage: null,
    roomDescription: "",
    floor: "",
    rentPrice: "",
    parking: "false",
    contactNumber: "",
    bathroom: "",
    address: "",
  });

  useEffect(() => {
    // Fetch product data by ID for editing
    axios
      .get(`http://localhost:5000/api/products/${id}`) // Replace with your actual endpoint
      .then((res) => {
        const productData = res.data.product;
        setForm((prevForm) => ({
          ...prevForm,
          roomDescription: productData.roomDescription,
          floor: productData.floor,
          rentPrice: productData.rentPrice,
          parking: productData.parking.toString(), // Ensure parking is a string
          contactNumber: productData.contactNo,
          bathroom: productData.bathroom,
          address: productData.address,
          previewImage: `http://localhost:5000/rooms/${productData.roomImage}`,
        }));
      })
      .catch((error) =>
        toast.error(
          error.response?.data?.message || "Error fetching product data."
        )
      );
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleFormImage = (event) => {
    const file = event.target.files[0];
    setForm({
      ...form,
      roomImage: file,
      previewImage: URL.createObjectURL(file),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("roomImage", form.roomImage);
    formData.append("roomDescription", form.roomDescription);
    formData.append("floor", form.floor);
    formData.append("rentPrice", form.rentPrice);
    formData.append("parking", form.parking);
    formData.append("contactNo", form.contactNumber);
    formData.append("bathroom", form.bathroom);
    formData.append("address", form.address);

    axios
      .put(`http://localhost:5000/api/products/${id}`, formData) // Replace with actual update API
      .then((res) => {
        toast.success(res.data.message);
        navigate("/admin"); // Navigate back to admin dashboard
      })
      .catch((error) =>
        toast.error(error.response?.data?.message || "Error updating product.")
      );
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar/Menu Bar */}
      <div className="w-64 bg-gray-800 text-white p-4 h-full flex flex-col justify-between">
        <h2 className="text-2xl font-semibold mb-4">Admin Dashboard</h2>
        <ul>
          <li>
            <a
              href="/admin"
              className="text-lg py-2 hover:bg-gray-700 block px-4"
            >
              Dashboard
            </a>
          </li>
          <li>
            <a
              href="/admin/products"
              className="text-lg py-2 hover:bg-gray-700 block px-4"
            >
              Manage Products
            </a>
          </li>
          {/* Add more menu items here */}
        </ul>
        {/* Menu footer or any bottom content can go here */}
      </div>

      {/* Room Details in the Frame */}
      <div className="flex-1 p-8 bg-gray-100 overflow-auto">
        <h2 className="text-2xl font-semibold mb-4 mt-2">Edit Room Details</h2>
        <div className="bg-white p-6 rounded-lg shadow-lg h-full">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="flex items-center space-x-6">
              <div className="w-1/2">
                <label className="block text-sm font-medium text-gray-700">
                  Room Image
                </label>
                <input
                  type="file"
                  className="mt-2 block w-full text-sm text-gray-900 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  onChange={handleFormImage}
                />
                {form.previewImage && (
                  <img
                    src={form.previewImage}
                    alt="Preview"
                    className="mt-4 max-w-full h-auto rounded-lg"
                  />
                )}
              </div>
              <div className="w-1/2">
                <label className="block text-sm font-medium text-gray-700">
                  Room Description
                </label>
                <textarea
                  name="roomDescription"
                  value={form.roomDescription}
                  onChange={handleInputChange}
                  className="mt-2 block w-full text-sm text-gray-900 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Floor
              </label>
              <input
                type="text"
                name="floor"
                value={form.floor}
                onChange={handleInputChange}
                className="mt-2 block w-full text-sm text-gray-900 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Rent Price
              </label>
              <input
                type="number"
                name="rentPrice"
                value={form.rentPrice}
                onChange={handleInputChange}
                className="mt-2 block w-full text-sm text-gray-900 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Parking
              </label>
              <select
                className="mt-2 block w-full text-sm text-gray-900 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                name="parking"
                value={form.parking}
                onChange={handleInputChange}
              >
                <option value="true">Available</option>
                <option value="false">Not Available</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Contact Number
              </label>
              <input
                type="text"
                name="contactNumber"
                value={form.contactNumber}
                onChange={handleInputChange}
                className="mt-2 block w-full text-sm text-gray-900 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Bathroom Count
              </label>
              <input
                type="number"
                name="bathroom"
                value={form.bathroom}
                onChange={handleInputChange}
                className="mt-2 block w-full text-sm text-gray-900 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Address
              </label>
              <input
                type="text"
                name="address"
                value={form.address}
                onChange={handleInputChange}
                className="mt-2 block w-full text-sm text-gray-900 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <button
              type="submit"
              className="mt-4 w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Edit Rooms
            </button>
          </form>
        </div>
      </div>
      
    </div>
    
  );
};

export default AdminUpdate;
