import { Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import ForgotPassword from "./pages/account/forgetPassword.jsx";
import Login from "./pages/account/Login";
import Register from "./pages/account/Register";
import ResetPassword from "./pages/account/resetPassword.jsx";
import AboutUs from "./pages/homepage/AboutUs.jsx";
import ContactUs from "./pages/homepage/ContactUs.jsx";
import Dashboard from "./pages/homepage/Dashboard.jsx"; // Updated path to match your structure
import FAQ from "./pages/homepage/Faq.jsx";
import FlatDetails from "./pages/homepage/FlatDetails.jsx"; // Updated path to match your structure
import PrivacyPolicy from "./pages/homepage/PrivacyPolicy.jsx";
import TermsCondition from "./pages/homepage/TermsCondition.jsx";
import AddRooms from "./pages/private/AddRooms.jsx";
import AdminDashboard from "./pages/private/AdminDashboard.jsx";
import AdminUpdate from "./pages/private/AdminUpdate.jsx";

function App() {
  // This should be replaced with actual authentication logic
  const isAuthenticated = localStorage.getItem("authToken") ? true : false; // Example: token-based check
  const isAdmin = localStorage.getItem("isAdmin") === "true"; // Example: checking if user is an admin

  const publicRoutes = [
    { path: "/", element: <Dashboard /> },
    { path: "/navbar", element: <Navbar /> },
    { path: "/footer", element: <Footer /> },
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },
    { path: "/adminDash", element: <AdminDashboard /> },
    { path: "/aboutus", element: <AboutUs /> },
    { path: "/contactus", element: <ContactUs /> },
    { path: "/privacypolicy", element: <PrivacyPolicy /> },
    { path: "/termscondition", element: <TermsCondition /> },
    { path: "/faq", element: <FAQ /> },
    { path: "/flat-details/:id", element: <FlatDetails /> },
    { path: "/adminUpdate/:id", element: <AdminUpdate /> },
    { path: "/addRooms", element: <AddRooms /> },
    { path: "/forgot-password", element: <ForgotPassword /> },
    { path: "/reset-password", element: <ResetPassword /> },
    { path: "*", element: <>Page not found</> },
  ];

  const privateRoutes = [{ path: "*", element: <>Unauthorized</> }];

  const routes = isAuthenticated
    ? isAdmin
      ? privateRoutes
      : publicRoutes
    : publicRoutes;

  const router = createBrowserRouter(routes);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RouterProvider router={router} />
    </Suspense>
  );
}

export default App;
