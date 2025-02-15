import {
  FaEnvelope,
  FaFileAlt,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaPhoneSquareAlt,
  FaQuestionCircle,
  FaShieldAlt,
  FaUser,
} from "react-icons/fa"; // Import Font Awesome icons
import "tailwindcss/tailwind.css"; // Import Tailwind CSS
import parts from "../assets/icons/logo_white.png";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-6 mt-6">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
          {/* Left Section with Icons */}
          <div className="flex flex-col justify-center items-start space-y-4">
            <div className="flex items-center space-x-2">
              <FaMapMarkerAlt className="w-5 h-5" /> {/* Address Icon */}
              <p className="text-sm font-bold">Lamatar, Lalitpur 44600</p>
            </div>
            <div className="flex items-center space-x-2">
              <FaEnvelope className="w-5 h-5" /> {/* Email Icon */}
              <p className="text-sm font-bold">rentify20@gmail.com</p>
            </div>
            <div className="flex items-center space-x-2">
              <FaPhoneAlt className="w-5 h-5" /> {/* Phone Icon */}
              <p className="text-sm font-bold">+977-9862242899</p>
            </div>
            <div className="flex items-center space-x-2">
              <FaUser className="w-5 h-5" /> {/* Developer Icon */}
              <p className="text-sm font-bold">Kirtan Shrestha</p>
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
              <li className="flex items-center space-x-2">
                <FaShieldAlt className="w-5 h-5" /> {/* Privacy Icon */}
                <a
                  href="/privacypolicy"
                  className="text-white hover:text-gray-400 font-bold"
                >
                  Privacy Policy
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <FaFileAlt className="w-5 h-5" /> {/* Terms Icon */}
                <a
                  href="/termscondition"
                  className="text-white hover:text-gray-400 font-bold"
                >
                  Terms of Use
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <FaQuestionCircle className="w-5 h-5" /> {/* FAQ Icon */}
                <a
                  href="/faq"
                  className="text-white hover:text-gray-400 font-bold"
                >
                  FAQ
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <FaPhoneSquareAlt className="w-5 h-5" /> {/* Contact Icon */}
                <a
                  href="/contactus"
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
