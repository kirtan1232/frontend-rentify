// FlatDetails.jsx
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "tailwindcss/tailwind.css";
import Footer from "../../components/Footer.jsx";
import Navbar from "../../components/Navbar.jsx";
import Wishlist from "../../components/wishlist.jsx";

const FlatDetails = () => {
  const { id } = useParams();
  const [flat, setFlat] = useState(null);
  const [similarFlats, setSimilarFlats] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3000/api/rooms/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setFlat(data);
        fetch("http://localhost:3000/api/rooms")
          .then((res) => res.json())
          .then((allFlats) => {
            const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
            const similar = allFlats
              .filter((f) => f._id !== data._id && !wishlist.includes(f._id))
              .sort(() => 0.5 - Math.random())
              .slice(0, 3);
            setSimilarFlats(similar);
          });
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [id]);

  if (!flat) {
    return <p className="text-center text-gray-600">Loading...</p>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <div className="flex-grow pt-20 px-6 pb-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Flat Details
        </h2>

        <div className="border border-gray-300 rounded-lg p-6 bg-white shadow-lg max-w-6xl mx-auto mb-12">
          <div className="flex flex-col md:flex-row items-start justify-center w-full gap-8">
            <div className="w-full md:w-1/2">
              <img
                src={`http://localhost:3000/${flat.roomImage}`}
                alt="Room"
                className="w-full h-96 object-cover rounded-lg shadow-lg"
              />
            </div>

            <div className="w-full md:w-1/2 bg-white border border-gray-200 rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center">
                <h3 className="text-2xl font-semibold text-gray-800">{flat.roomDescription}</h3>
                <Wishlist flatId={flat._id} />
              </div>
              <div className="space-y-3 mt-4">
                <DetailItem label="Price" value={`₹${flat.rentPrice}/month`} />
                <DetailItem label="Address" value={flat.address} />
                <DetailItem label="Floor" value={flat.floor} />
                <DetailItem label="Parking" value={flat.parking} />
                <DetailItem label="Contact" value={flat.contactNo} />
                <DetailItem label="Bathrooms" value={flat.bathroom} />
              </div>
            </div>
          </div>
        </div>

        <div className="border border-gray-300 rounded-lg p-6 bg-white shadow-lg max-w-6xl mx-auto">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Similar Properties
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {similarFlats.map((similarFlat) => (
              <Link
                key={similarFlat._id}
                to={`/flat-details/${similarFlat._id}`}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl hover:scale-105 transition-transform duration-300"
              >
                <img
                  src={`http://localhost:3000/${similarFlat.roomImage}`}
                  alt="Similar property"
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h4 className="text-lg font-semibold mb-2">{similarFlat.roomDescription}</h4>
                  <p className="text-gray-600 mb-1">₹{similarFlat.rentPrice}/month</p>
                  <p className="text-gray-600 text-sm">{similarFlat.address}</p>
                </div>
              </Link>
            ))}
          </div>
          {similarFlats.length === 0 && (
            <p className="text-center text-gray-600">No similar properties found</p>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

const DetailItem = ({ label, value }) => (
  <div className="flex justify-between items-center border-b border-gray-100 pb-2">
    <span className="text-gray-600 font-medium">{label}:</span>
    <span className="text-gray-800">{value}</span>
  </div>
);

export default FlatDetails;