import "tailwindcss/tailwind.css"; // Import Tailwind CSS
// Import the logo image
import parts from "../assets/icons/logo_white.png";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-6 mt-6">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
          {/* Left Section with Contact Info */}
          <div className="flex flex-col justify-center items-start space-y-4">
            {/* Contact Info Section */}
            <div className="space-y-1">
              <p className="text-sm font-bold">
                Address: Lamatar, Lalitpur 44600
              </p>
              <p className="text-sm font-bold">Email: rentify20@gmail.com</p>
              <p className="text-sm font-bold">Phone: +977-9862242899</p>
              <p className="text-sm font-bold">Developer: Kirtan Shrestha</p>
            </div>
          </div>

          {/* Logo Section (Center) */}
          <div className="flex justify-center">
            <a href="/">
              <img src={parts} alt="Your Logo" className="w-32" />{" "}
              {/* Increased logo size */}
            </a>
          </div>

          {/* Quick Links Section (Extreme Right) */}
          <div className="flex justify-end space-y-2">
            <ul className="list-none text-sm space-y-2">
              <li>
                <a
                  href="/privacy"
                  className="text-white hover:text-gray-400 font-bold"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="/terms"
                  className="text-white hover:text-gray-400 font-bold"
                >
                  Terms of Use
                </a>
              </li>
              <li>
                <a
                  href="/faq"
                  className="text-white hover:text-gray-400 font-bold"
                >
                  FAQ
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="text-white hover:text-gray-400 font-bold"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright Section */}
        <p className="text-center mt-6 text-xs text-gray-400 font-bold">
          &copy; 2025 Rentify- Kirtan Shrestha. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
