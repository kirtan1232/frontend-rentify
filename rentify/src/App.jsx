import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import './App.css';

import Login from "./pages/account/Login";
import Register from "./pages/account/Register";



function App() {
  return (

    <Router>

      <ToastContainer />

      {/* Main Content Wrapper with margin on the left and right */}
      <div className="main-content">
        <Routes>

          <Route path="/" element={<Register />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>


    </Router>
  );
}

export default App;