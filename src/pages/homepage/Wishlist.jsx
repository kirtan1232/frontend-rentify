// components/Wishlist.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "tailwindcss/tailwind.css";
import Footer from "../../components/Footer.jsx";
import Navbar from "../../components/Navbar.jsx";

const Wishlist = () => {
  const [wishlistRooms, setWishlistRooms] = useState([]);

  useEffect(() => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    fetch("http://localhost:3000/api/rooms")
      .then((res) => res.json())
      .then((allFlats) => {
        const wishlistFlats = allFlats.filter((flat) => wishlist.includes(flat._id));
        setWishlistRooms(wishlistFlats);
      });
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <div className="flex-grow pt-20 px-6 pb-12">
        

        <div className="border-4 border-gray-200 rounded-lg p-6 shadow-lg relative overflow-hidden">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Wishlist
        </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {wishlistRooms.map((room) => (
              <Link
                key={room._id}
                to={`/flat-details/${room._id}`}
                className="relative bg-white p-6 shadow-md rounded-lg group overflow-hidden"
              >
                <img
                  src={`http://localhost:3000/${room.roomImage}`}
                  alt="Room"
                  className="w-full h-64 object-cover rounded-md mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:brightness-75"
                />
                <div className="transition-opacity duration-300 group-hover:opacity-75">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {room.roomDescription}
                  </h3>
                  <p className="text-gray-600">Price: ₹{room.rentPrice}</p>
                  <p className="text-gray-600">Address: {room.address}</p>
                </div>
                <Link
                  to={`/flat-details/${room._id}`}
                  className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-lightBlue-500 text-white font-bold text-lg rounded-md py-2 px-4 hover:bg-lightBlue-600"
                >
                  View
                </Link>
              </Link>
            ))}
          </div>

          {wishlistRooms.length === 0 && (
            <p className="col-span-full text-center text-gray-600">
              No rooms in wishlist
            </p>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Wishlist;