import { Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import SearchBar from "./components/Searchbar.jsx";
import EditProfile from "./pages/account/editProfile.jsx";
import ForgotPassword from "./pages/account/forgetPassword.jsx";
import Login from "./pages/account/Login";
import Register from "./pages/account/Register";
import ResetPassword from "./pages/account/resetPassword.jsx";
import AboutUs from "./pages/homepage/AboutUs.jsx";
import Address from "./pages/homepage/Address.jsx";
import ContactUs from "./pages/homepage/ContactUs.jsx";
import Dashboard from "./pages/homepage/Dashboard.jsx"; // Updated path to match your structure
import FAQ from "./pages/homepage/Faq.jsx";
import FlatDetails from "./pages/homepage/FlatDetails.jsx"; // Updated path to match your structure
import PrivacyPolicy from "./pages/homepage/PrivacyPolicy.jsx";
import TermsCondition from "./pages/homepage/TermsCondition.jsx";
import WishList from "./pages/homepage/Wishlist.jsx"; // Updated path to match your structure
import Failure from "./pages/payment/Failure.jsx";
import Success from "./pages/payment/Success.jsx";
import AddRooms from "./pages/private/AddRooms.jsx";
import AdminDashboard from "./pages/private/AdminDashboard.jsx";
import AdminUpdate from "./pages/private/AdminUpdate.jsx";
import EditUser from "./pages/private/EditUser.jsx";
import Profile from "./pages/private/Profile.jsx";

function App() {
  // This should be replaced with actual authentication logic
  const isAuthenticated = localStorage.getItem("authToken") ? true : false; // Example: token-based check
  const isAdmin = localStorage.getItem("isAdmin") === "true"; // Example: checking if user is an admin

  const publicRoutes = [
    { path: "/", element: <Dashboard /> },
    { path: "/navbar", element: <Navbar /> },
    { path: "/footer", element: <Footer /> },
    { path: "/searchbar", element: <SearchBar /> },
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },
    { path: "/edit-profile/:id", element: <EditProfile /> },
    { path: "/adminDash", element: <AdminDashboard /> },
    { path: "/aboutus", element: <AboutUs /> },
    { path: "/contactus", element: <ContactUs /> },
    { path: "/privacypolicy", element: <PrivacyPolicy /> },
    { path: "/termscondition", element: <TermsCondition /> },
    { path: "/address/:location", element: <Address /> },
    { path: "/faq", element: <FAQ /> },
    { path: "/flat-details/:id", element: <FlatDetails /> },
    { path: "/wishlist", element: <WishList /> },
    { path: "/adminUpdate/:id", element: <AdminUpdate /> },
    { path: "/addRooms", element: <AddRooms /> },
    { path: "/profile", element: <Profile /> },
    { path: "/edit-user/:id", element: <EditUser /> },
    { path: "/forgot-password", element: <ForgotPassword /> },
    { path: "/reset-password", element: <ResetPassword /> },
    { path: "/success", element: <Success /> },
    { path: "/failure", element: <Failure /> },
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
