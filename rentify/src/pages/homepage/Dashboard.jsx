import React from "react";


const Dashboard = () => {
    return (
        <>
            {/* Navbar included */}
            <div className="bg-gray-50 min-h-screen">
                {/* Hero Section */}
                <section className="flex flex-col md:flex-row items-center justify-between px-6 py-16">
                    {/* Left Section */}
                    <div className="md:w-1/2 text-center md:text-left">
                        <h1 className="text-4xl font-bold text-gray-800 mb-4 leading-snug">
                            Modern living <br /> for everyone
                        </h1>
                        <p className="text-lg text-gray-600 mb-6">
                            We provide a complete service for the sale, purchase, or rental of real estate.
                        </p>
                        <div className="flex items-center bg-white rounded-lg shadow-md overflow-hidden border">
                            <select className="flex-1 px-4 py-3 text-gray-700 outline-none">
                                <option value="Property Type">Property Type</option>
                                <option value="House">House</option>
                                <option value="Apartment">Apartment</option>
                                <option value="Villa">Villa</option>
                            </select>
                            <input
                                type="text"
                                placeholder="Search for a location"
                                className="flex-1 px-4 py-3 text-gray-700 outline-none"
                            />
                            <button className="bg-green-500 text-white px-6 py-3 hover:bg-green-600 transition duration-300">
                                Search
                            </button>
                        </div>
                    </div>

                    {/* Right Section */}
                    <div className="md:w-1/2 mt-10 md:mt-0 flex justify-center">
                        <img
                            src="/assets/icons/logo.png"  // Use the correct path
                            alt="Modern Building"
                            className="w-full max-w-md rounded-lg shadow-lg"
                        />
                    </div>
                </section>

                {/* Top Offers Section */}
                <section className="px-6 py-12 bg-white">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-gray-800 mb-2">Top Offers</h2>
                        <p className="text-gray-600">Fulfill your career dreams with our exclusive offers.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {Array.from({ length: 6 }).map((_, index) => (
                            <div
                                key={index}
                                className="bg-gray-100 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition"
                            >
                                <img
                                    src="https://via.placeholder.com/300"
                                    alt="Flat for Rent"
                                    className="w-full h-40 object-cover"
                                />
                                <div className="p-4">
                                    <h3 className="text-lg font-bold text-gray-800 mb-2">Flat for Rent</h3>
                                    <p className="text-gray-600">Rs. 12,000 · Lalitpur</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* About Us Section */}
                <section className="px-6 py-12 bg-gray-50">
                    <div className="flex flex-col md:flex-row items-center">
                        <div className="md:w-1/2">
                            <img
                                src="https://via.placeholder.com/500"
                                alt="About Us"
                                className="rounded-lg shadow-lg"
                            />
                        </div>
                        <div className="md:w-1/2 md:pl-12 mt-8 md:mt-0">
                            <h2 className="text-3xl font-bold text-gray-800 mb-4">About Us</h2>
                            <p className="text-gray-600 leading-relaxed">
                                We are a dedicated team helping you achieve your dream of modern living. With
                                expertise in real estate, we ensure seamless services for buying, selling, and
                                renting properties. Let us help you find your perfect home.
                            </p>
                        </div>
                    </div>
                </section>

              


            </div>
        </>
    );
};

export default Dashboard;
