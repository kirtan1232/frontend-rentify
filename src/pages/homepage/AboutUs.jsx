import React from "react";
import aboutus1 from "../../assets/images/aboutus1.png";
import aboutus2 from "../../assets/images/aboutus2.jpg";
import Footer from "../../components/Footer.jsx";
import Header from "../../components/Navbar.jsx"; // Ensure correct import path

const AboutUs = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />

      {/* About Section */}
      <section className="max-w-6xl mx-auto px-6 py-16 text-center">
        <h1 className="text-4xl font-bold text-gray-900">About Us</h1>
        <p className="mt-4 text-lg text-gray-600">
          Welcome to Rentify – Your Trusted Partner in Finding the Perfect Home
        </p>
      </section>

      {/* Mission Section */}
      <section className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <img
          src={aboutus1}
          alt="Our Mission"
          className="rounded-lg shadow-md w-80 h-80 object-cover mx-auto"
        />

        <div>
          <h2 className="text-3xl font-semibold text-gray-800">
            Our Mission: Empowering Growth
          </h2>
          <p className="mt-4 text-gray-600">
            To provide seamless, transparent, and stress-free rental experiences
            by offering carefully curated flats in Kathmandu,
            Bhaktapur,Lalitpur. We prioritize quality, affordability, and trust,
            ensuring every tenant and property owner feels valued and supported.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div>
          <h2 className="text-3xl font-semibold text-gray-800">
            Our Commitment
          </h2>
          <p className="mt-4 text-gray-600">
            We’re more than a rental platform—we’re a community. Whether you’re
            a tenant searching for your next home or a landlord looking to list
            your property, we strive to build lasting relationships rooted in
            respect and reliability. Sustainability and ethical practices are at
            the heart of what we do, ensuring our properties meet modern
            standards while fostering eco-friendly living.
          </p>
        </div>
        <img
          src={aboutus2}
          alt="Our Mission"
          className="rounded-lg shadow-md w-80 h-80 object-cover mx-auto"
        />
      </section>

      {/* Statistics Section */}
      <section className="max-w-6xl mx-auto px-6 py-16 text-center">
        <h2 className="text-3xl font-semibold text-gray-800">Why choose us?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          <div className="p-6 bg-white shadow-lg rounded-lg">
            <h3 className="text-2xl font-bold text-blue-500">12+</h3>
            <p className="text-gray-600">Verified Properties</p>
          </div>
          <div className="p-6 bg-white shadow-lg rounded-lg">
            <h3 className="text-2xl font-bold text-blue-500 ">
              {" "}
              Have a question or concern? Our team is always here to help.
            </h3>
            <p className="text-gray-600"></p>
          </div>
          <div className="p-6 bg-white shadow-lg rounded-lg">
            <h3 className="text-2xl font-bold text-blue-500">100+</h3>
            <p className="text-gray-600">Customers</p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutUs;
