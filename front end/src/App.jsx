import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import './App.css';
import Navbar from './components/Navbar';


import Login from "./pages/account/login";

import './App.css';

function App() {
  return (

    <Router>
      <Navbar />
      <ToastContainer />

      {/* Main Content Wrapper with margin on the left and right */}
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>

      <Footer />
    </Router>
  );
}

export default App;