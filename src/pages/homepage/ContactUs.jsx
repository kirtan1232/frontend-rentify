import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer.jsx";
import Navbar from "../../components/Navbar.jsx";

const ContactUs = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  // Check if user is logged in
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar user={user} /> {/* Passing user to Navbar */}
      {/* Contact Section */}
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

            {/* Show Login Button only if user is NOT logged in */}
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

            <form
              className="mt-4 space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                navigate("/"); // Redirect to dashboard on submit
              }}
            >
              <div>
                <label className="block text-gray-700">Your Full Name *</label>
                <input
                  type="text"
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
                  placeholder="Type your phone number..."
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700">Email</label>
                <input
                  type="email"
                  placeholder="Enter Your Email"
                  className="w-full p-2 border rounded-md"
                />
              </div>

              <div>
                <label className="block text-gray-700">Location *</label>
                <input
                  type="text"
                  placeholder="Select or search your location"
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700">Rental Type *</label>
                <input
                  type="text"
                  placeholder="Select or type"
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700">Tole/Area *</label>
                <input
                  type="text"
                  placeholder="e.g., Samakhushi"
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700">If Any</label>
                <textarea
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
