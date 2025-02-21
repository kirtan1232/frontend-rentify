// EditUser.jsx
import React, { useEffect, useState } from "react";
import { FaHome, FaPlus, FaSave, FaUser } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3000/api/user/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.user) {
          setUser(data.user);
        } else {
          alert("User not found");
          navigate("/profile");
        }
      })
      .catch((error) => {
        console.error("Error fetching user:", error);
        alert("Error fetching user");
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:3000/api/user/update/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(user),
        }
      );

      if (response.ok) {
        alert("User updated successfully");
        navigate("/profile");
      } else {
        alert("Failed to update user");
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex">
      {/* Left Menu Bar */}
      <div className="bg-gray-800 text-white w-64 p-6 flex flex-col justify-between min-h-screen">
        <div>
          <h2 className="text-2xl font-semibold mb-8 text-center">
            Admin Dashboard
          </h2>
          <ul className="space-y-4 mt-4">
            <li>
              <button
                onClick={() => navigate("/adminDash")}
                className="w-full text-left px-4 py-2 rounded-md hover:bg-gray-700 flex items-center"
              >
                <FaHome className="mr-2" /> Home
              </button>
            </li>
            <li>
              <button
                onClick={() => navigate("/addRooms")}
                className="w-full text-left px-4 py-2 rounded-md hover:bg-gray-700 flex items-center"
              >
                <FaPlus className="mr-2" /> Add Rooms
              </button>
            </li>
            <li>
              <button
                onClick={() => navigate("/profile")}
                className="w-full text-left px-4 py-2 rounded-md hover:bg-gray-700 flex items-center"
              >
                <FaUser className="mr-2" /> User Profile
              </button>
            </li>
          </ul>
        </div>

        <div className="flex justify-between mt-auto space-x-2">
          <button
            onClick={() => navigate("/")}
            className="w-full px-4 py-2 rounded-md bg-sky-500 hover:bg-sky-600 text-white font-bold"
          >
            Dashboard
          </button>
          <button
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("isAdmin");
              localStorage.removeItem("user");
              navigate("/login");
            }}
            className="w-full px-4 py-2 rounded-md bg-red-600 hover:bg-red-700 text-white font-bold"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Right Content with Background Image */}
<div className="flex-1 flex justify-center items-center p-6 overflow-auto bg-gray-100 relative">
  {/* Edit User Frame */}
  <div className="w-96 h-96 border-4 border-gray-300 rounded-lg p-6 shadow-lg flex flex-col justify-center items-center z-10 bg-cyan-800">
    <h2  className="text-2xl font-semibold mb-6">Edit User</h2>
    <form onSubmit={handleSubmit} className="space-y-4 w-full">
      <div>
        <label className="block text-gray-600">Name</label>
        <input
          type="text"
          name="name"
          value={user.name}
          onChange={handleChange}
          className="w-full p-2 border rounded mt-1 text-sm"
        />
      </div>
      <div>
        <label className="block text-gray-600 ">Email</label>
        <input
          type="email"
          name="email"
          value={user.email}
          onChange={handleChange}
          className="w-full p-2 border rounded mt-1 text-sm"
        />
      </div>
      <div>
        <label className="block text-gray-600">Role</label>
        <select
          name="role"
          value={user.role}
          onChange={handleChange}
          className="w-full p-2 border rounded mt-1 text-sm"
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
      </div>
      <button
        type="submit"
        className="w-24 bg-blue-500 text-white py-1.5 rounded hover:bg-blue-600 transition text-sm mx-auto block"
      >
        <FaSave className="mr-2" /> Save
      </button>
    </form>
  </div>
  {/* Background Image */}
  <div
    className="absolute top-0 right-0 w-full h-full bg-cover bg-no-repeat bg-right z-0"
    style={{
      backgroundImage: `url("../../src/assets/images/bg.avif")`,
    }}
  ></div>
</div>
    </div>
  );
};

export default EditUser;
