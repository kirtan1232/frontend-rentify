import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import './App.css';



import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Login from "./pages/account/Login";
import Register from "./pages/account/Register";
import Home from "./pages/homepage/Dashboard"; // Updated path to match your structure
import AdminDashboard from "./pages/private/AdminDashboard";
import AdminUpdate from "./pages/private/AdminUpdate";

// Import Navbar component

function App() {
  return (
    <Router>
      <ToastContainer />
      <Navbar />




      {/* Main Content Wrapper */}
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path='/admin/update/:id' element={<AdminUpdate />} />

        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
