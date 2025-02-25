import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "tailwindcss/tailwind.css";
import Footer from "../../components/Footer.jsx";
import Navbar from "../../components/Navbar.jsx";
import SearchBar from "../../components/Searchbar.jsx";
import { FaWhatsapp } from "react-icons/fa"; // Import the SearchBar component

const Dashboard = () => {
  const [flats, setFlats] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [findRoomIndex, setFindRoomIndex] = useState(0);
  const [sastoFlatIndex, setSastoFlatIndex] = useState(0);
  const [commercialFlatIndex, setCommercialFlatIndex] = useState(0);

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

  const getVisibleSastoFlats = () => {
    const sastoFlats = flats.filter((flat) => flat.rentPrice < 10000); // Filter flats with price < ₹10,000
    if (sastoFlats.length <= 4) return sastoFlats;
    return sastoFlats.slice(sastoFlatIndex, sastoFlatIndex + 4);
  };
  const getVisibleCommercialFlats = () => {
    const commercialFlats = flats.filter((flat) => flat.rentPrice > 30000); // Filter flats with price < ₹10,000
    if (commercialFlats.length <= 4) return commercialFlats;
    return commercialFlats.slice(commercialFlatIndex, commercialFlatIndex + 4);
  };

  const handleFindRoomNext = () => {
    setFindRoomIndex((prev) => (prev + 4) % flats.length);
  };

  const handleFindRoomPrev = () => {
    setFindRoomIndex((prev) => (prev - 4 + flats.length) % flats.length);
  };

  const handleSastoFlatNext = () => {
    const sastoFlats = flats.filter((flat) => flat.rentPrice < 10000);
    setSastoFlatIndex((prev) => (prev + 4) % sastoFlats.length);
  };

  const handleSastoFlatPrev = () => {
    const sastoFlats = flats.filter((flat) => flat.rentPrice < 10000);
    setSastoFlatIndex(
      (prev) => (prev - 4 + sastoFlats.length) % sastoFlats.length
    );
  };
  const handleCommercialFlatPrev = () => {
    const sastoFlats = flats.filter((flat) => flat.rentPrice > 30000);
    setCommercialFlatIndex((prev) => (prev + 4) % sastoFlats.length);
  };

  const handleCommercialFlatNext = () => {
    const sastoFlats = flats.filter((flat) => flat.rentPrice > 30000);
    setCommercialFlatIndex(
      (prev) => (prev - 4 + sastoFlats.length) % sastoFlats.length
    );
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      {/* Find by Address Section */}
      <div className="pt-20 px-6">
        <div className="border-4 border-gray-200 rounded-lg p-6 shadow-lg relative overflow-hidden bg-white">
          <div className="flex items-center mb-6">
            <div className="flex-shrink-0">
              <img
                src="../../src/assets/images/search.gif"
                alt="Search GIF"
                className="w-32 h-32 object-cover rounded-lg shadow-md"
              />
            </div>
            <div className="flex-grow ml-6">
              <SearchBar flats={flats} />
            </div>
            <div className="flex-shrink-0 flex-grow">
              <img
                src="../../src/assets/images/roompop.gif"
                alt="Advertisement GIF"
                className="w-full h-32 object-cover rounded-lg shadow-md"
              />
            </div>
          </div>
          

          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            Find by Address
          </h2>

          {/* Location Icons */}
          <div className="flex justify-start space-x-12 mb-12">
            <Link
              to="/address/Kathmandu"
              className="flex flex-col items-center text-2xl font-bold  text-gray-800 hover:text-blue-800"
            >
              <img
                src="../../src/assets/images/kathmandu.PNG"
                alt="Kathmandu"
                className="w-24 h-24 hover:scale-150 transition-transform duration-300"
              />
              <span className="mt-2">Kathmandu</span>
            </Link>
            <Link
              to="/address/Lalitpur"
              className="flex flex-col items-center text-2xl font-bold  text-gray-800 hover:text-blue-800"
            >
              <img
                src="../../src/assets/images/lalitpur.PNG"
                alt="Lalitpur"
                className="w-24 h-24 hover:scale-150 transition-transform duration-300"
              />
              <span className="mt-2">Lalitpur</span>
            </Link>
            <Link
              to="/address/Bhaktapur"
              className="flex flex-col items-center text-2xl font-bold text-gray-800 hover:text-blue-800"
            >
              <img
                src="../../src/assets/images/bhaktapur.PNG"
                alt="Bhaktapur"
                className="w-24 h-24 hover:scale-150 transition-transform duration-300"
              />
              <span className="mt-2">Bhaktapur</span>
            </Link>
            <div className="flex-shrink-0 flex-grow">
              <img
                src="../../src/assets/images/advertisement.gif"
                alt="Advertisement GIF"
                className="w-full h-32 object-cover rounded-lg shadow-md"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Hot Deals Section */}
      <div className="pt-20 px-6">
        {/* Frame for Rooms */}
        <div className="border-4 border-gray-200 rounded-lg p-6 shadow-lg relative overflow-hidden">
          <h2 className="text-3xl font-bold text-gray-800 mb-12">Hot Deals</h2>
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
            <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 flex space-x-2">
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
      </div>

      {/* Find Room Frame */}
      <div className="pt-20 px-6">
        <div className="border-4 border-gray-200 rounded-lg p-6 shadow-lg relative overflow-hidden">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Find Room</h2>
          <div className="relative">
            {/* Navigation Arrows */}
            {flats.length > 4 && (
              <>
                <button
                  onClick={handleFindRoomPrev}
                  className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-blue-500 text-white p-2 rounded-sm hover:bg-blue-600 transform -translate-x-1/2"
                >
                  &larr;
                </button>
                <button
                  onClick={handleFindRoomNext}
                  className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-blue-500 text-white p-2 rounded-sm hover:bg-blue-600 transform translate-x-1/2"
                >
                  &rarr;
                </button>
              </>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {flats.length > 0 ? (
                getVisibleFindRoomFlats().map((flat, index) => (
                  <div
                    key={index}
                    className="relative bg-white p-6 shadow-md rounded-lg group overflow-hidden"
                  >
                    {/* Rent Icon */}
                    <div className="absolute top-2 left-2 bg-white bg-opacity-90 px-3 py-1 rounded-full z-10 flex items-center">
                      <span className="text-sm font-bold text-blue-600">
                        ₹{flat.rentPrice}/mo
                      </span>
                    </div>

                    <img
                      src={`http://localhost:3000/${flat.roomImage}`}
                      alt="Room"
                      className="w-full h-64 object-cover rounded-md mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:brightness-75"
                    />
                    <div className="transition-opacity duration-300 group-hover:opacity-75">
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">
                        {flat.roomDescription}
                      </h3>
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
          </div>
        </div>
      </div>

      {/* Sasto Flat Frame */}
      <div className="pt-20 px-6">
        <div className="border-4 border-gray-200 rounded-lg p-6 shadow-lg relative overflow-hidden">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Sasto Flat</h2>
          <div className="relative">
            {/* Navigation Arrows */}
            {flats.filter((flat) => flat.rentPrice < 10000).length > 4 && (
              <>
                <button
                  onClick={handleSastoFlatPrev}
                  className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-green-500 text-white p-2 rounded-sm hover:bg-green-600 transform -translate-x-1/2"
                >
                  &larr;
                </button>
                <button
                  onClick={handleSastoFlatNext}
                  className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-green-500 text-white p-2 rounded-sm hover:bg-green-600 transform translate-x-1/2"
                >
                  &rarr;
                </button>
              </>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {flats.length > 0 ? (
                getVisibleSastoFlats().map((flat, index) => (
                  <div
                    key={index}
                    className="relative bg-white p-6 shadow-md rounded-lg group overflow-hidden"
                  >
                    {/* Rent Icon */}
                    <div className="absolute top-2 left-2 bg-white bg-opacity-90 px-3 py-1 rounded-full z-10 flex items-center">
                      <span className="text-sm font-bold text-green-600">
                        ₹{flat.rentPrice}/mo
                      </span>
                    </div>

                    <img
                      src={`http://localhost:3000/${flat.roomImage}`}
                      alt="Room"
                      className="w-full h-64 object-cover rounded-md mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:brightness-75"
                    />
                    <div className="transition-opacity duration-300 group-hover:opacity-75">
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">
                        {flat.roomDescription}
                      </h3>
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
                  No Sasto Flats available.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Commerical Flat Frame */}
      <div className="pt-20 px-6">
        <div className="border-4 border-gray-200 rounded-lg p-6 shadow-lg relative overflow-hidden">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            Commercial Rooms
          </h2>
          <div className="relative">
            {/* Navigation Arrows */}
            {flats.filter((flat) => flat.rentPrice > 30000).length > 4 && (
              <>
                <button
                  onClick={handleCommercialFlatPrev}
                  className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-red-500 text-white p-2 rounded-sm hover:bg-red-600 transform -translate-x-1/2"
                >
                  &larr;
                </button>
                <button
                  onClick={handleCommercialFlatNext}
                  className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-red-500 text-white p-2 rounded-sm hover:bg-red-600 transform translate-x-1/2"
                >
                  &rarr;
                </button>
              </>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {flats.length > 0 ? (
                getVisibleCommercialFlats().map((flat, index) => (
                  <div
                    key={index}
                    className="relative bg-white p-6 shadow-md rounded-lg group overflow-hidden"
                  >
                    {/* Rent Icon */}
                    <div className="absolute top-2 left-2 bg-white bg-opacity-90 px-3 py-1 rounded-full z-10 flex items-center">
                      <span className="text-sm font-bold text-red-600">
                        ₹{flat.rentPrice}/mo
                      </span>
                    </div>

                    <img
                      src={`http://localhost:3000/${flat.roomImage}`}
                      alt="Room"
                      className="w-full h-64 object-cover rounded-md mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:brightness-75"
                    />
                    <div className="transition-opacity duration-300 group-hover:opacity-75">
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">
                        {flat.roomDescription}
                      </h3>
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
                  No Commercial Flats available.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Sponsor GIF Section */}
      <div className="mb-6 flex justify-between px-6 items-center">
        {/* Left GIF */}
        <div>
          <img
            src="../../src/assets/images/left.gif"
            alt="Sponsor GIF Left"
            className="w-96 h-64 object-cover rounded-lg shadow-md"
          />
        </div>
        {/* Center GIF */}
        <div>
          <img
            src="../../src/assets/images/advertise.gif"
            alt="Sponsor GIF Right"
            className="min-w-full h-32 object-cover rounded-lg shadow-md"
          />
        </div>
        {/* Right GIF */}
        <div>
          <img
            src="../../src/assets/images/right.gif"
            alt="Sponsor GIF Right"
            className="w-96 h-64 object-cover rounded-lg shadow-md"
          />
        </div>
      </div>
      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/9862242899"
        className="fixed bottom-4 right-4 bg-green-500 hover:bg-green-700 text-white rounded-full p-3 shadow-lg z-50"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaWhatsapp className="w-12 h-12" />
      </a>
      <Footer />
    </div>
  );
};

export default Dashboard;
