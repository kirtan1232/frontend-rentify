import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import './App.css';



import Login from "./pages/account/Login";
import Register from "./pages/account/Register";
import Home from "./pages/homepage/Dashboard"; // Updated path to match your structure
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Import Navbar component

function App() {
  return (
    <Router>
      <ToastContainer />
      <Navbar/>




      {/* Main Content Wrapper */}
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
      <Footer/>
    </Router>
  );
}

export default App;
