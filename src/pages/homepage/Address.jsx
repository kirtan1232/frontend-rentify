// Address.jsx
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom"; // Ensure Link is imported
import "tailwindcss/tailwind.css";
import Footer from "../../components/Footer.jsx";
import Navbar from "../../components/Navbar.jsx";

const Address = () => {
  const { location } = useParams();
  const [flats, setFlats] = useState([]);

  useEffect(() => {
    console.log("Fetching rooms for location:", location);
    fetch("http://localhost:3000/api/rooms")
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched rooms:", data);
        const filteredFlats = data.filter((flat) =>
          flat.address.toLowerCase().includes(location.toLowerCase())
        );
        setFlats(filteredFlats);
      })
      .catch((error) => console.error("Error fetching flats:", error));
  }, [location]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow pt-20 px-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          Flats in {location}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {flats.length > 0 ? (
            flats.map((flat, index) => (
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
              No rooms available in {location}.
            </p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Address;