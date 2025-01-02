import React from 'react';
import 'tailwindcss/tailwind.css'; // Import Tailwind CSS

// Import the logo image
import parts from "../assets/icons/logo_white.png";

const Footer = () => {
    return (
        <div className="footer-container">
            <footer className="bg-black text-white py-2 mt-4">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <a href="/" className="d-block mb-2">
                            <img src={parts} alt="Your Logo" className="w-32" />
                        </a>
                        <div className="col-md-4">
                            <h5 className="text-base font-semibold">Rentify</h5>
                            <p className="text-sm">Address: Kathmandu 44600</p>
                            <p className="text-sm">Email: rentifysupport@gmail.com</p>
                            <p className="text-sm">Phone: +977-980124545</p>
                        </div>
                        <div className="col-md-4">
                            <h5 className="text-base font-semibold">Account</h5>
                            <ul className="list-none text-sm">
                                <li><a href="/profile" className="text-white hover:text-gray-400">My Account</a></li>
                                <li><a href="/login" className="text-white hover:text-gray-400">Login / Register</a></li>
                                <li><a href="/cart" className="text-white hover:text-gray-400">Cart</a></li>
                                <li><a href="/all-products" className="text-white hover:text-gray-400">Shop</a></li>
                            </ul>
                        </div>
                        <div className="col-md-4">
                            <h5 className="text-base font-semibold">Quick Link</h5>
                            <ul className="list-none text-sm">
                                <li><a href="/privacy" className="text-white hover:text-gray-400">Privacy Policy</a></li>
                                <li><a href="/terms" className="text-white hover:text-gray-400">Terms of Use</a></li>
                                <li><a href="/faq" className="text-white hover:text-gray-400">FAQ</a></li>
                                <li><a href="/contact" className="text-white hover:text-gray-400">Contact</a></li>
                            </ul>
                        </div>
                    </div>
                    <p className="text-center mt-2 text-xs">© Copyright Kirtan Shrestha, 2025. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default Footer;
