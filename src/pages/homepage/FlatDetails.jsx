import axios from "axios";
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [sendStatus, setSendStatus] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const flatResponse = await axios.get(
          `http://localhost:3000/api/rooms/${id}`
        );
        setFlat(flatResponse.data);

        const allFlatsResponse = await axios.get(
          "http://localhost:3000/api/rooms"
        );
        const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
        const similar = allFlatsResponse.data
          .filter((f) => f._id !== id && !wishlist.includes(f._id))
          .sort(() => 0.5 - Math.random())
          .slice(0, 3);
        setSimilarFlats(similar);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [id]);

  const handleSendMessage = async () => {
    if (!message.trim()) {
      setSendStatus("Message cannot be empty");
      return;
    }

    setIsSending(true);
    setSendStatus(null);

    try {
      const htmlTemplate = `
        <html>
          <head>
            <style>
              body {
                font-family: Arial, sans-serif;
                line-height: 1.6;
              }
              .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                border: 1px solid #ddd;
                border-radius: 5px;
              }
              .header {
                background-color: #f4f4f4;
                padding: 10px;
                text-align: center;
              }
              .content {
                margin-top: 20px;
              }
              .content h2 {
                color: #333;
              }
              .content p {
                margin: 10px 0;
              }
              .footer {
                margin-top: 20px;
                text-align: center;
                color: #777;
              }
              .image {
                max-width: 100%;
                height: auto;
              }
            </style>
          </head>
          <body>
            <div class="container"  >
             <div class="header" style="background-color: orange; padding: 10px; text-align: center;">
              <h1 style="color: white;">Rentify</h1>
                </div>
                 <div class="content">
                <h2><strong>User Message:</strong></h2>
                <p><strong>${message}</strong></p>
                <h3><strong>Flat Details:</strong></h3>
                <p><strong>Room Description:</strong> <strong>${flat.roomDescription}</strong></p>
                <p><strong>Floor:</strong> <strong>${flat.floor}</strong></p>
               <p><strong>Address:</strong> <strong>${flat.address}</strong></p>
                <p><strong>Rent Price:</strong> <strong>₹${flat.rentPrice}/month</strong></p>
                <p><strong>Parking:</strong> <strong>${flat.parking}</strong></p>
                <p><strong>Contact No:</strong> <strong>${flat.contactNo}</strong></p>
                <p><strong>Bathrooms:</strong> <strong>${flat.bathroom}</strong></p>
                <img class="image" src="http://localhost:3000/${flat.roomImage}" alt="Room Image">
                </div>
              <div class="footer">
                <p>&copy; 2025 Rentify-Kirtan Shrestha</p>
              </div>
            </div>
          </body>
        </html>
      `;

      await axios.post("http://localhost:3000/api/email/send", {
        to: "rentify20@gmail.com",
        subject: `Question about Flat ${flat._id}`,
        text: `User Message: ${message}\n\nFlat Details:\n${JSON.stringify(
          flat,
          null,
          2
        )}`,
        html: htmlTemplate,
      });

      setSendStatus("Message sent successfully!");
      setMessage("");
      setTimeout(() => setIsModalOpen(false), 2000);
    } catch (error) {
      setSendStatus(
        error.response?.data?.message ||
          "Failed to send message. Please try again."
      );
    } finally {
      setIsSending(false);
    }
  };

  const handlePayment = async (payment_method) => {
    const url = `http://localhost:3000/api/esewa/create/${id}`;
    const data = {
      amount: flat.rentPrice, // Use the actual rent price
      products: [
        { product: flat.roomDescription, amount: flat.rentPrice, quantity: 1 }, // Use flat details
      ],
      payment_method,
    };
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Add any other headers as needed
        },
        body: JSON.stringify(data),
      });
      // Check if the request was successful (status code 2xx)
      if (response.ok) {
        const responseData = await response.json();
        esewaCall(responseData.formData);

        // if (responseData.payment_method === "esewa") {
        // } else if (responseData.payment_method === "khalti") {
        //   khaltiCall(responseData.data);
        // }
      } else {
        console.error("Failed to fetch:", response.status, response.statusText);
      }
    } catch (error) {
      console.error("Error during fetch:", error);
    }
  };

  const esewaCall = (formData) => {
    console.log(formData);
    var path = "https://rc-epay.esewa.com.np/api/epay/main/v2/form";

    var form = document.createElement("form");
    form.setAttribute("method", "POST");
    form.setAttribute("action", path);

    for (var key in formData) {
      var hiddenField = document.createElement("input");
      hiddenField.setAttribute("type", "hidden");
      hiddenField.setAttribute("name", key);
      hiddenField.setAttribute("value", formData[key]);
      form.appendChild(hiddenField);
    }

    document.body.appendChild(form);
    form.submit();
  };

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
                <h3 className="text-2xl font-semibold text-gray-800">
                  {flat.roomDescription}
                </h3>
                <Wishlist flatId={flat._id} />
              </div>
              <div className="space-y-3 mt-4">
                <DetailItem label="Price" value={`₹${flat.rentPrice}/month`} />
                <DetailItem label="Address" value={flat.address} />
                <DetailItem label="Floor" value={flat.floor} />
                <DetailItem label="Parking" value={flat.parking} />
                <DetailItem label="Contact" value={flat.contactNo} />
                <DetailItem label="Bathrooms" value={flat.bathroom} />
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="mt-4 w-72  bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-200 "
                >
                  Ask Anything About This Room/Flat
                </button>
                <button
                  onClick={() => handlePayment("esewa")}
                  className="mt-4 w-64 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors duration-200"
                >
                  Rent Now with eSewa
                </button>
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
                  <h4 className="text-lg font-semibold mb-2">
                    {similarFlat.roomDescription}
                  </h4>
                  <p className="text-gray-600 mb-1">
                    ₹{similarFlat.rentPrice}/month
                  </p>
                  <p className="text-gray-600 text-sm">{similarFlat.address}</p>
                </div>
              </Link>
            ))}
          </div>
          {similarFlats.length === 0 && (
            <p className="text-center text-gray-600">
              No similar properties found
            </p>
          )}
        </div>
      </div>

      {/* Email Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
            <h3 className="text-xl font-bold mb-4">Ask About This Flat</h3>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full h-32 p-2 border border-gray-300 rounded-md mb-4"
              placeholder="Type your question here..."
              maxLength="500"
            />
            {sendStatus && (
              <p
                className={`mb-4 text-sm ${
                  sendStatus.includes("success")
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {sendStatus}
              </p>
            )}
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleSendMessage}
                disabled={isSending}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:bg-blue-300"
              >
                {isSending ? "Sending..." : "Send Message"}
              </button>
            </div>
          </div>
        </div>
      )}

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
