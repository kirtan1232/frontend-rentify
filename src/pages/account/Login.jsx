import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "/src/components/Navbar.jsx";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("All fields are required.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/login",
        { email, password }
      );

      const { token, name, role } = response.data;

      // Store user details in localStorage
      localStorage.setItem("user", JSON.stringify({ token, name, role }));

      // Display the success toast message
      toast.success(`Welcome back, ${name}!`);

      // Redirect to home page, where navbar will show the admin dashboard link if applicable
      navigate("/");
      window.location.reload(); // Reload page to reflect changes in Navbar
    } catch (error) {
      const errorMsg =
        error.response?.data?.message || "Login failed. Please try again.";

      toast.error(errorMsg); // Display error toast if login fails
    }
  };

  return (
    <div className="login-page min-h-screen flex flex-col bg-gradient-to-b from-blue-200 to-white relative">
      <Navbar />
      <div className="flex-grow flex items-center justify-center px-5">
        <div className="login-container flex max-w-4xl w-full bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="image-container w-1/2 hidden md:block">
            <img
              src="https://st4.depositphotos.com/16425882/22075/v/450/depositphotos_220753186-stock-illustration-buying-renting-new-house-keyring.jpg"
              alt="Login Illustration"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="form-container w-full md:w-1/2 p-8">
            <h3 className="text-3xl font-bold text-center text-gray-700 mb-6">
              Welcome Back
            </h3>
            <form onSubmit={handleLogin}>
              <div className="mb-6">
                <label
                  htmlFor="email"
                  className="block text-lg font-medium text-gray-700 mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="block w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="password"
                  className="block text-lg font-medium text-gray-700 mb-2"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="block w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 px-4 bg-green-600 text-white font-semibold rounded-md shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                Login
              </button>
            </form>
            <p className="text-center mt-6 text-sm text-gray-600">
              Forgot your password?{" "}
              <a
                href="/forgot-password"
                className="text-blue-500 hover:underline"
              >
                Click here
              </a>
            </p>
            <p className="text-center mt-2 text-sm text-gray-600">
              Don’t have an account?{" "}
              <a href="/register" className="text-blue-500 hover:underline">
                Register
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
