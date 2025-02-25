import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import eSewaIcon from "../../assets/icons/esewa.jpg";

const Failure = () => {

    const navigate = useNavigate();
  
    useEffect(() => {
      toast.error("Payment Failed!", { autoClose: 3000 }); // Toast notification
      const timer = setTimeout(() => {
        navigate("/");
      }, 5000); // Redirect after 5 seconds
  
      return () => clearTimeout(timer); // Cleanup timer on unmount
    }, [navigate]);
  
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
        {/* eSewa Header with Icon */}
        <div className="flex items-center justify-center mb-8">
          <img src={eSewaIcon} alt="eSewa Icon" className="w-10 h-10 mr-2" />
          <div className="text-white text-3xl font-bold">eSewa</div>
        </div>
  
        {/* Payment Success Frame */}
        <div className="text-center bg-gray-800 p-6 rounded-lg shadow-lg w-96">
          <h2 className="text-3xl font-bold text-red-400">Payment Failed! Please Try Again.</h2>
          <p className="text-gray-300 mt-2">
            <img
              src="../../src/assets/images/error.gif"
              alt="Success"
              className="w-96 h-64 object-cover rounded-lg shadow-md"
            />
          </p>
          <p className="text-orange-400 mt-4 text-lg font-bold">
            Redirecting back to HomeScreen...
          </p>
        </div>
      </div>
    );
  };

export default Failure;
