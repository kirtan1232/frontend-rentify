import "tailwindcss/tailwind.css"; // Import Tailwind CSS
import Footer from "../../components/Footer.jsx";
import Navbar from "../../components/Navbar.jsx"; // Ensure correct import path

const PrivacyPolicy = () => {
  return (
    <div>
      <Navbar /> {/* Navbar component */}

      <div className="container mx-auto px-4 md:px-6 py-10">
        <h1 className="text-3xl font-bold text-center mb-6 text-indigo-600">Privacy Policy</h1>

        <p className="text-lg text-gray-700 mb-6 font-bold">
          Welcome to Rentify. Your privacy is of paramount importance to us. This Privacy Policy outlines the types of personal information that is collected and recorded by Rentify and how we use it. By using this website, you consent to the terms of this Privacy Policy.
        </p>

        <section className="bg-indigo-50 border-l-4 border-indigo-500 shadow-md rounded-lg p-6 mb-8 hover:shadow-lg transition-shadow duration-300">
          <h2 className="text-2xl font-semibold mb-4 text-indigo-700">1. Information We Collect</h2>
          <p className="text-lg text-gray-700">
            Rentify collects personal information when you use our services, such as when you register an account, make a booking, or communicate with us. The types of personal data we collect include:
            <ul className="list-disc pl-6 mt-2">
              <li>Your name, email address, and phone number.</li>
              <li>Payment information for processing transactions.</li>
              <li>Details about the properties you are interested in or have rented.</li>
              <li>Communication with Rentify, including support requests and inquiries.</li>
            </ul>
          </p>
        </section>

        <section className="bg-indigo-50 border-l-4 border-indigo-500 shadow-md rounded-lg p-6 mb-8 hover:shadow-lg transition-shadow duration-300">
          <h2 className="text-2xl font-semibold mb-4 text-indigo-700">2. How We Use Your Information</h2>
          <p className="text-lg text-gray-700">
            We use your personal information to:
            <ul className="list-disc pl-6 mt-2">
              <li>Process transactions and fulfill rental agreements.</li>
              <li>Provide customer support and respond to your inquiries.</li>
              <li>Improve our services and tailor content to your preferences.</li>
              <li>Send marketing communications, if you have opted in.</li>
            </ul>
          </p>
        </section>

        <section className="bg-indigo-50 border-l-4 border-indigo-500 shadow-md rounded-lg p-6 mb-8 hover:shadow-lg transition-shadow duration-300">
          <h2 className="text-2xl font-semibold mb-4 text-indigo-700">3. Data Security</h2>
          <p className="text-lg text-gray-700">
            Rentify takes reasonable precautions to protect your personal data. However, no system is completely secure. While we strive to protect your data, we cannot guarantee absolute security of your information.
          </p>
        </section>

        <section className="bg-indigo-50 border-l-4 border-indigo-500 shadow-md rounded-lg p-6 mb-8 hover:shadow-lg transition-shadow duration-300">
          <h2 className="text-2xl font-semibold mb-4 text-indigo-700">4. Data Sharing</h2>
          <p className="text-lg text-gray-700">
            Rentify does not sell or rent your personal data to third parties. We may share your information with trusted service providers who help us operate our platform or process transactions, but only for the purposes stated in this Privacy Policy.
          </p>
        </section>

        <section className="bg-indigo-50 border-l-4 border-indigo-500 shadow-md rounded-lg p-6 mb-8 hover:shadow-lg transition-shadow duration-300">
          <h2 className="text-2xl font-semibold mb-4 text-indigo-700">5. Cookies</h2>
          <p className="text-lg text-gray-700">
            Rentify uses cookies to enhance your experience on our website. Cookies are small files that are stored on your device and help us remember your preferences and improve functionality.
          </p>
        </section>

        <section className="bg-indigo-50 border-l-4 border-indigo-500 shadow-md rounded-lg p-6 mb-8 hover:shadow-lg transition-shadow duration-300">
          <h2 className="text-2xl font-semibold mb-4 text-indigo-700">6. Your Rights</h2>
          <p className="text-lg text-gray-700">
            You have the right to access, update, or delete the personal information we hold about you. If you wish to exercise these rights, please contact us using the details provided below.
          </p>
        </section>

        <section className="bg-indigo-50 border-l-4 border-indigo-500 shadow-md rounded-lg p-6 mb-8 hover:shadow-lg transition-shadow duration-300">
          <h2 className="text-2xl font-semibold mb-4 text-indigo-700">7. Changes to This Policy</h2>
          <p className="text-lg text-gray-700">
            Rentify may update this Privacy Policy from time to time. Any changes will be posted on this page, and we encourage you to review it periodically for updates.
          </p>
        </section>

        <section className="bg-indigo-50 border-l-4 border-indigo-500 shadow-md rounded-lg p-6 mb-8 hover:shadow-lg transition-shadow duration-300">
          <h2 className="text-2xl font-semibold mb-4 text-indigo-700">8. Contact Us</h2>
          <p className="text-lg text-gray-700">
            If you have any questions or concerns about our Privacy Policy, please contact us at:
            <ul className="list-none pl-6 mt-2">
              <li>Email: rentify20@gmail.com</li>
              <li>Phone: +977-9862242899</li>
              <li>Address: Lamatar, Lalitpur 44600</li>
            </ul>
          </p>
        </section>
      </div>

      <Footer /> {/* Footer component */}
    </div>
  );
};

export default PrivacyPolicy;
