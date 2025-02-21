import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer.jsx";
import Navbar from "../../components/Navbar.jsx";

const ContactUs = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    location: "",
    rentalType: "",
    area: "",
    message: "",
  });
  const [status, setStatus] = useState(null); // For success/error messages

  // Check if user is logged in
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus("Message sent successfully!");
        setFormData({
          fullName: "",
          phone: "",
          email: "",
          location: "",
          rentalType: "",
          area: "",
          message: "",
        });
      } else {
        setStatus("Failed to send message. Please try again.");
      }
    } catch (error) {
      setStatus("Error: Could not send message.");
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar user={user} /> {/* Passing user to Navbar */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Left Side - Message Box */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900">
              Post a question or comment to see, read, and reply to
            </h2>
            <div className="mt-4 flex items-center">
              <img
                src="../../src/assets/icons/logo.png"
                alt="User"
                className="w-10 h-10 rounded-full mr-3"
              />
              <div>
                <p className="text-gray-800 font-semibold">Admin Rentify</p>
                <p className="text-gray-600 text-sm">Posted on Jan 20, 2025</p>
              </div>
            </div>
            <p className="mt-4 text-gray-700">
              Have a question? Feel free to ask us anytime! Whether you are
              looking for a rental property or need help listing your home, our
              team is here to support you.
            </p>
            {!user && (
              <button
                onClick={() => navigate("/login")}
                className="mt-4 px-4 py-2 bg-orange-500 text-white font-semibold rounded-lg"
              >
                Login to Post a Question
              </button>
            )}
          </div>

          {/* Right Side - Contact Form */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900">
              Didn't Find What You Are Looking For?
              <span className="text-orange-500"> Let us know</span>
            </h2>

            {status && (
              <p
                className={`mt-2 ${
                  status.includes("success") ? "text-green-600" : "text-red-600"
                }`}
              >
                {status}
              </p>
            )}

            <form className="mt-4 space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-gray-700">Your Full Name *</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Type your name..."
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700">
                  Your Phone Number *
                </label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Type your phone number..."
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter Your Email"
                  className="w-full p-2 border rounded-md"
                />
              </div>

              <div>
                <label className="block text-gray-700">Location *</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Select or search your location"
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700">Rental Type *</label>
                <input
                  type="text"
                  name="rentalType"
                  value={formData.rentalType}
                  onChange={handleChange}
                  placeholder="Select or type"
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700">Tole/Area *</label>
                <input
                  type="text"
                  name="area"
                  value={formData.area}
                  onChange={handleChange}
                  placeholder="e.g., Samakhushi"
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700">If Any</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Write a message"
                  className="w-full p-2 border rounded-md"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full px-4 py-2 bg-orange-500 text-white font-semibold rounded-lg"
              >
                Send →
              </button>
            </form>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default ContactUs;
