import "tailwindcss/tailwind.css"; // Import Tailwind CSS
import Footer from "../../components/Footer.jsx";
import Navbar from "../../components/Navbar.jsx"; // Ensure correct import path

const TermsAndConditions = () => {
  return (
    <div>
      <Navbar /> {/* Navbar component */}

      <div className="container mx-auto px-4 md:px-6 py-10">
        <h1 className="text-3xl font-bold text-center mb-6 text-orange-600">Terms and Conditions</h1>

        <p className="text-lg text-gray-700 mb-6 font-bold">
          Welcome to Rentify. By using our platform, you agree to comply with and be bound by the following terms and conditions. Please read them carefully.
        </p>

        <section className="bg-orange-50 border-l-4 border-orange-500 shadow-md rounded-lg p-6 mb-8 hover:shadow-lg transition-shadow duration-300">
          <h2 className="text-2xl font-semibold mb-4 text-orange-700">1. Acceptance of Terms</h2>
          <p className="text-lg text-gray-700">
            By accessing and using Rentify, you agree to be bound by these Terms and Conditions and all applicable laws and regulations. If you do not agree with any part of these terms, you must discontinue using our services.
          </p>
        </section>

        <section className="bg-orange-50 border-l-4 border-orange-500 shadow-md rounded-lg p-6 mb-8 hover:shadow-lg transition-shadow duration-300">
          <h2 className="text-2xl font-semibold mb-4 text-orange-700">2. User Responsibilities</h2>
          <p className="text-lg text-gray-700">
            As a user of Rentify, you agree to:
            <ul className="list-disc pl-6 mt-2">
              <li>Provide accurate and up-to-date information.</li>
              <li>Comply with all applicable laws and regulations while using the platform.</li>
              <li>Be responsible for maintaining the confidentiality of your account details.</li>
            </ul>
          </p>
        </section>

        <section className="bg-orange-50 border-l-4 border-orange-500 shadow-md rounded-lg p-6 mb-8 hover:shadow-lg transition-shadow duration-300">
          <h2 className="text-2xl font-semibold mb-4 text-orange-700">3. Rental Agreement</h2>
          <p className="text-lg text-gray-700">
            By renting any property through Rentify, you agree to the rental terms provided by the property owner. All rentals are subject to availability, and we are not responsible for any issues with the rented property.
          </p>
        </section>

        <section className="bg-orange-50 border-l-4 border-orange-500 shadow-md rounded-lg p-6 mb-8 hover:shadow-lg transition-shadow duration-300">
          <h2 className="text-2xl font-semibold mb-4 text-orange-700">4. Payment Terms</h2>
          <p className="text-lg text-gray-700">
            Payments for rentals are processed through secure payment gateways. You agree to pay all applicable charges associated with the rental and any other fees specified in the rental agreement.
          </p>
        </section>

        <section className="bg-orange-50 border-l-4 border-orange-500 shadow-md rounded-lg p-6 mb-8 hover:shadow-lg transition-shadow duration-300">
          <h2 className="text-2xl font-semibold mb-4 text-orange-700">5. Cancellation and Refunds</h2>
          <p className="text-lg text-gray-700">
            Cancellation and refund policies are determined by the property owner. You must review and agree to these policies before confirming any rental. Rentify is not responsible for cancellations or refunds.
          </p>
        </section>

        <section className="bg-orange-50 border-l-4 border-orange-500 shadow-md rounded-lg p-6 mb-8 hover:shadow-lg transition-shadow duration-300">
          <h2 className="text-2xl font-semibold mb-4 text-orange-700">6. Limitation of Liability</h2>
          <p className="text-lg text-gray-700">
            Rentify is not liable for any damages or losses resulting from the use of our platform or services. We do not guarantee the accuracy or reliability of the information provided by third-party property owners.
          </p>
        </section>

        <section className="bg-orange-50 border-l-4 border-orange-500 shadow-md rounded-lg p-6 mb-8 hover:shadow-lg transition-shadow duration-300">
          <h2 className="text-2xl font-semibold mb-4 text-orange-700">7. Changes to Terms</h2>
          <p className="text-lg text-gray-700">
            Rentify reserves the right to update these Terms and Conditions at any time. Any changes will be posted on this page, and we encourage you to review them periodically.
          </p>
        </section>

        <section className="bg-orange-50 border-l-4 border-orange-500 shadow-md rounded-lg p-6 mb-8 hover:shadow-lg transition-shadow duration-300">
          <h2 className="text-2xl font-semibold mb-4 text-orange-700">8. Contact Us</h2>
          <p className="text-lg text-gray-700">
            If you have any questions or concerns about these Terms and Conditions, please contact us at:
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

export default TermsAndConditions;
