import { Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import ForgotPassword from "./pages/account/forgetPassword.jsx";
import Login from "./pages/account/Login";
import Register from "./pages/account/Register";
import ResetPassword from "./pages/account/resetPassword.jsx";
import Dashboard from "./pages/homepage/Dashboard"; // Updated path to match your structure
import AdminDashboard from "./pages/private/AdminDashboard";
import AdminUpdate from "./pages/private/AdminUpdate";
import AddRooms from "./pages/private/AddRooms.jsx";

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
    { path: "/adminUpdate", element: <AdminUpdate /> },
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
