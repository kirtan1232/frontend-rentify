import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getSingleProduct, updateProduct } from "../../api/Api";
import "../private/AdminUpdate.css";

const AdminUpdate = () => {
  const { id } = useParams(); // Get product ID from URL params
  const navigate = useNavigate();

  const [form, setForm] = useState({
    roomImage: null,
    previewImage: null,
    roomDescription: "",
    floor: "",
    rentPrice: "",
    parking: "false",
    contactNumber: "",
    bathroom: "",
    address: "",
  });

  useEffect(() => {
    // Fetch product data by ID for editing
    getSingleProduct(id)
      .then((res) => {
        const productData = res.data.product;
        setForm((prevForm) => ({
          ...prevForm,
          roomDescription: productData.roomDescription,
          floor: productData.floor,
          rentPrice: productData.rentPrice,
          parking: productData.parking.toString(), // Ensure parking is a string
          contactNumber: productData.contactNo,
          bathroom: productData.bathroom,
          address: productData.address,
          previewImage: `http://localhost:5000/rooms/${productData.roomImage}`,
        }));
      })
      .catch((error) =>
        toast.error(
          error.response?.data?.message || "Error fetching product data."
        )
      );
  }, [id]); // No need to include 'form' in dependencies

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleFormImage = (event) => {
    const file = event.target.files[0];
    setForm({
      ...form,
      roomImage: file,
      previewImage: URL.createObjectURL(file),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("roomImage", form.roomImage);
    formData.append("roomDescription", form.roomDescription);
    formData.append("floor", form.floor);
    formData.append("rentPrice", form.rentPrice);
    formData.append("parking", form.parking);
    formData.append("contactNo", form.contactNumber);
    formData.append("bathroom", form.bathroom);
    formData.append("address", form.address);

    updateProduct(id, formData)
      .then((res) => {
        toast.success(res.data.message);
        navigate("/admin"); // Navigate back to admin dashboard
      })
      .catch((error) =>
        toast.error(error.response?.data?.message || "Error updating product.")
      );
  };

  return (
    <div className="container">
      <h2>Update Product</h2>
      <form onSubmit={handleSubmit}>
        <label>Room Image</label>
        <input
          type="file"
          className="form-control"
          onChange={handleFormImage}
        />
        {form.previewImage && (
          <img
            src={form.previewImage}
            alt="Preview"
            className="img-fluid rounded mt-2"
          />
        )}

        <label className="mt-2">Room Description</label>
        <textarea
          className="form-control"
          name="roomDescription"
          value={form.roomDescription}
          onChange={handleInputChange}
        ></textarea>

        <label className="mt-2">Floor</label>
        <input
          type="text"
          className="form-control"
          name="floor"
          value={form.floor}
          onChange={handleInputChange}
        />

        <label className="mt-2">Rent Price</label>
        <input
          type="number"
          className="form-control"
          name="rentPrice"
          value={form.rentPrice}
          onChange={handleInputChange}
        />

        <label className="mt-2">Parking</label>
        <select
          className="form-control"
          name="parking"
          value={form.parking}
          onChange={handleInputChange}
        >
          <option value="true">Available</option>
          <option value="false">Not Available</option>
        </select>

        <label className="mt-2">Contact Number</label>
        <input
          type="text"
          className="form-control"
          name="contactNumber"
          value={form.contactNumber}
          onChange={handleInputChange}
        />

        <label className="mt-2">Bathroom Count</label>
        <input
          type="number"
          className="form-control"
          name="bathroom"
          value={form.bathroom}
          onChange={handleInputChange}
        />

        <label className="mt-2">Address</label>
        <input
          type="text"
          className="form-control"
          name="address"
          value={form.address}
          onChange={handleInputChange}
        />

        <button type="submit" className="btn btn-primary mt-3">
          Update Product
        </button>
      </form>
    </div>
  );
};

export default AdminUpdate;
