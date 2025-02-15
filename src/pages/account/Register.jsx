import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { toast } from "react-toastify"; // Import toast
import "react-toastify/dist/ReactToastify.css"; // Import toast styles
import Footer from "../../components/Footer.jsx"; // Ensure the path is correct
import Navbar from "../../components/Navbar.jsx"; // Import Navbar

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate(); // Initialize useNavigate
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const validateForm = () => {
    // Check if all fields are filled
    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      toast.error("All fields are required");
      return false;
    }

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate the form before submitting
    if (validateForm()) {
      try {
        // Call the register API using axios with the new URL
        const response = await axios.post(
          "http://localhost:3000/api/auth/register",
          formData
        );

        if (response.data.success) {
          toast.success("User registered successfully!"); // Show success toast
          setFormData({
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
          });
          navigate("/login"); // Redirect to login page after successful signup
        }
      } catch (error) {
        const errorMsg =
          error.response?.data?.message || "Something went wrong!";
        toast.error(errorMsg); // Show error toast (e.g., email already exists)
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-100 to-white relative">
      {/* Fixed Navbar at the top */}
      <Navbar />
      <div className="pt-16 flex items-center justify-center px-5">
        {" "}
        {/* Add padding-top to push content below navbar */}
        <div className="flex max-w-4xl bg-white rounded-xl shadow-lg overflow-hidden w-5/6 md:w-3/4 h-auto">
          {/* Increased width and auto height */}
          <div className="flex-1 flex items-center justify-center">
            <img
              src="https://st4.depositphotos.com/16425882/22075/v/450/depositphotos_220753186-stock-illustration-buying-renting-new-house-keyring.jpg"
              alt="Sign Up Illustration"
              className="w-full h-full object-cover rounded-lg shadow-md"
            />
          </div>
          <div className="flex-1 p-8 bg-gray-50">
            <h3 className="text-2xl font-serif font-semibold text-center mb-6">
              Create an account
            </h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="text-sm text-gray-600">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-3 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="text-sm text-gray-600">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-3 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="text-sm text-gray-600">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full p-3 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="confirmPassword"
                  className="text-sm text-gray-600"
                >
                  Re-type Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  placeholder="Re-type password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full p-3 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 px-4 bg-green-600 text-white font-semibold rounded-md shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                Create Account
              </button>
            </form>
            <p className="text-center mt-4">
              Already have an account?{" "}
              <a href="/login" className="text-blue-600 hover:underline">
                Login
              </a>
            </p>
          </div>
        </div>
      </div>
        {/* Footer Section */}
        <Footer />
    </div>
  );
};

export default Register;
