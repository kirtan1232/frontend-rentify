import React, { useState } from "react";
import { toast } from "react-toastify";
import { createProductApi } from "../../api/Api";

const AddProducts = ({ setProducts }) => {
  const [roomImage, setRoomImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [roomDescription, setRoomDescription] = useState("");
  const [floor, setFloor] = useState("");
  const [address, setAddress] = useState("");
  const [rentPrice, setRentPrice] = useState("");
  const [parking, setParking] = useState(false);
  const [contactNo, setContactNo] = useState("");
  const [bathroom, setBathroom] = useState("");

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setRoomImage(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("roomImage", roomImage);
    formData.append("roomDescription", roomDescription);
    formData.append("floor", floor);
    formData.append("address", address);
    formData.append("rentPrice", rentPrice);
    formData.append("parking", parking);
    formData.append("contactNo", contactNo);
    formData.append("bathroom", bathroom);

    createProductApi(formData)
      .then((res) => {
        toast.success(res.data.message);
        setProducts((prev) => [...prev, res.data.product]);
        
      })
      .catch((error) =>
        toast.error(error.response?.data?.message || "Error creating product.")
      );
  };

  return (
    <div
      className="modal fade"
      id="exampleModal"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5">Create a new product!</h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <label>Room Image</label>
              <input
                type="file"
                className="form-control"
                onChange={handleImageUpload}
              />
              {previewImage && (
                <img
                  src={previewImage}
                  alt="Preview"
                  className="img-fluid rounded mt-2"
                />
              )}

              <label className="mt-2">Room Description</label>
              <textarea
                className="form-control"
                value={roomDescription}
                onChange={(e) => setRoomDescription(e.target.value)}
              ></textarea>

              <label className="mt-2">Floor</label>
              <input
                type="text"
                className="form-control"
                value={floor}
                onChange={(e) => setFloor(e.target.value)}
              />

              <label className="mt-2">Address</label>
              <input
                type="text"
                className="form-control"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />

              <label className="mt-2">Rent Price</label>
              <input
                type="number"
                className="form-control"
                value={rentPrice}
                onChange={(e) => setRentPrice(e.target.value)}
              />

              <label className="mt-2">Parking</label>
              <select
                className="form-control"
                value={parking}
                onChange={(e) => setParking(e.target.value === "true")}
              >
                <option value="true">Available</option>
                <option value="false">Not Available</option>
              </select>

              <label className="mt-2">Contact Number</label>
              <input
                type="text"
                className="form-control"
                value={contactNo}
                onChange={(e) => setContactNo(e.target.value)}
              />

              <label className="mt-2">Bathroom Count</label>
              <input
                type="number"
                className="form-control"
                value={bathroom}
                onChange={(e) => setBathroom(e.target.value)}
              />

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button type="submit" className="btn btn-primary">
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProducts;
