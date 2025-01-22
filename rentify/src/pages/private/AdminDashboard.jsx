// AdminDashboard.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { deleteProduct, getAllProducts } from "../../api/Api";
import "../private/AdminDashboard.css";
import AddProducts from "./AddProducts"; // Import AddProducts component
import Sidebar from "./Sidebar"; // Import Sidebar component

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [userName, setUserName] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.name) {
      setUserName(capitalizeFirstLetter(user.name));
    }
  }, []);

  const capitalizeFirstLetter = (str) => {
    return str ? str.charAt(0).toUpperCase() + str.slice(1) : "";
  };

  useEffect(() => {
    getAllProducts()
      .then((res) => setProducts(res.data.products))
      .catch((error) => console.error(error));
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      deleteProduct(id)
        .then((res) => {
          toast.success(res.data.message);
          setProducts((prev) => prev.filter((product) => product._id !== id));
        })
        .catch((error) =>
          toast.error(
            error.response?.data?.message || "Error deleting product."
          )
        );
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="container">
      {/* Sidebar */}
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Button to toggle sidebar */}
      <button className="btn btn-primary" onClick={toggleSidebar}>
        ☰
      </button>

      <div className="container">
        <div className="d-flex justify-content-between mt-5">
          <h2>Welcome to Rentify! Mr. Admin {userName}</h2>
          <button
            type="button"
            className="btn btn-success"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            Add Product
          </button>
        </div>
        {/* Add Product Modal */}
        <AddProducts setProducts={setProducts} />{" "}
        {/* Pass setProducts to AddProducts */}
        {/* Product Table */}
        <table className="table mt-3">
          <thead className="table-dark">
            <tr>
              <th>Room Image</th>
              <th>Description</th>
              <th>Floor</th>
              <th>Address</th>
              <th>Rent Price</th>
              <th>Parking</th>
              <th>Contact</th>
              <th>Bathroom</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products && products.length > 0 ? (
              products.map((product) => (
                <tr key={product._id}>
                  <td>
                    <img
                      src={`http://localhost:5000/rooms/${product.roomImage}`}
                      alt="Room"
                      height="40"
                    />
                  </td>
                  <td>{product.roomDescription}</td>
                  <td>{product.floor}</td>
                  <td>{product.address}</td>
                  <td>{product.rentPrice}</td>
                  <td>{product.parking ? "Yes" : "No"}</td>
                  <td>{product.contactNo}</td>
                  <td>{product.bathroom}</td>
                  <td>
                    <div className="btn-group" role="group">
                      <Link
                        to={`/admin/update/${product._id}`}
                        className="btn btn-success"
                      >
                        Update
                      </Link>
                      <button
                        onClick={() => handleDelete(product._id)}
                        className="btn btn-danger"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="text-center">
                  No products found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
