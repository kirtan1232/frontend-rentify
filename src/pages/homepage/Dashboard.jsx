import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "tailwindcss/tailwind.css";
import Footer from "../../components/Footer.jsx";
import Navbar from "../../components/Navbar.jsx";

const Dashboard = () => {
  const [flats, setFlats] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [findRoomIndex, setFindRoomIndex] = useState(0);

  useEffect(() => {
    fetch("http://localhost:3000/api/rooms")
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched flats:", data);
        setFlats(data);
      })
      .catch((error) => console.error("Error fetching flats:", error));
  }, []);

  // Auto-advance carousel every 3 seconds if more than 4 rooms
  useEffect(() => {
    if (flats.length > 4) {
      const interval = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % (flats.length - 3));
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [flats.length]);

  const getVisibleFlats = () => {
    if (flats.length <= 4) return flats;
    return flats.slice(activeIndex, activeIndex + 4);
  };

  const getVisibleFindRoomFlats = () => {
    if (flats.length <= 4) return flats;
    return flats.slice(findRoomIndex, findRoomIndex + 4);
  };

  const handleFindRoomNext = () => {
    setFindRoomIndex((prev) => (prev + 4) % flats.length);
  };

  const handleFindRoomPrev = () => {
    setFindRoomIndex((prev) => (prev - 4 + flats.length) % flats.length);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <div className="flex-grow pt-20 px-6">
    {/* Sponsor GIF Section */}
    <div className="mb-6">
      <img
        src="../../src/assets/images/advertisement.gif"
        alt="Sponsor GIF"
        className="w-full h-52 object-cover rounded-lg shadow-md" // Stretch to full width with a fixed height
      />
    </div>

        <h2 className="text-3xl font-bold text-gray-800 mb-6">Hot Deals</h2>

        {/* Frame for Rooms */}
        <div className="border-4 border-gray-200 rounded-lg p-6 shadow-lg relative overflow-hidden">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 transition-transform duration-500 ease-in-out">
            {flats.length > 0 ? (
              getVisibleFlats().map((flat, index) => (
                <div
                  key={index}
                  className="relative bg-white p-6 shadow-md rounded-lg group overflow-hidden"
                >
                  <img
                    src={`http://localhost:3000/${flat.roomImage}`}
                    alt="Room"
                    className="w-full h-64 object-cover rounded-md mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:brightness-75"
                  />
                  <div className="transition-opacity duration-300 group-hover:opacity-75">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                      {flat.roomDescription}
                    </h3>
                    <p className="text-gray-600">Price: ₹{flat.rentPrice}</p>
                    <p className="text-gray-600">Address: {flat.address}</p>
                  </div>
                  <Link
                    to={`/flat-details/${flat._id}`}
                    className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-lightBlue-500 text-white font-bold text-lg rounded-md py-2 px-4 hover:bg-lightBlue-600"
                  >
                    View
                  </Link>
                </div>
              ))
            ) : (
              <p className="col-span-full text-center text-gray-600">
                No rooms available.
              </p>
            )}
          </div>

          {/* Progress Indicators */}
          {flats.length > 4 && (
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {[...Array(flats.length - 3)].map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full ${
                    index === activeIndex ? "bg-blue-500" : "bg-gray-300"
                  }`}
                  aria-label={`Slide ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Find Room Frame */}
        <h2 className="text-3xl font-bold text-gray-800 mt-12 mb-6">Find Room</h2>
        <div className="border-4 border-gray-200 rounded-lg p-6 shadow-lg relative overflow-hidden">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {flats.length > 0 ? (
              getVisibleFindRoomFlats().map((flat, index) => (
                <div
                  key={index}
                  className="relative bg-white p-6 shadow-md rounded-lg group overflow-hidden"
                >
                  <img
                    src={`http://localhost:3000/${flat.roomImage}`}
                    alt="Room"
                    className="w-full h-64 object-cover rounded-md mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:brightness-75"
                  />
                  <div className="transition-opacity duration-300 group-hover:opacity-75">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                      {flat.roomDescription}
                    </h3>
                    <p className="text-gray-600">Price: ₹{flat.rentPrice}</p>
                    <p className="text-gray-600">Address: {flat.address}</p>
                  </div>
                  <Link
                    to={`/flat-details/${flat._id}`}
                    className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-lightBlue-500 text-white font-bold text-lg rounded-md py-2 px-4 hover:bg-lightBlue-600"
                  >
                    View
                  </Link>
                </div>
              ))
            ) : (
              <p className="col-span-full text-center text-gray-600">
                No rooms available.
              </p>
            )}
          </div>

          {/* Navigation Buttons */}
          {flats.length > 4 && (
            <div className="flex justify-between mt-4">
              <button
                onClick={handleFindRoomPrev}
                className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600"
              >
                &larr; Previous
              </button>
              <button
                onClick={handleFindRoomNext}
                className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600"
              >
                Next &rarr;
              </button>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Dashboard;
