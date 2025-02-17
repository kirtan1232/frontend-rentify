// src/components/EditProfile.jsx
import axios from "axios";
import React, { useEffect, useState } from "react";


const EditProfile = () => {
  
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const userId = "6798cf9fd638459e2292e708"; // Replace with dynamic user ID if needed
  const token = localStorage.getItem("token"); // Assuming you store the token in localStorage

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/user/${userId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setUser(response.data.user);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError("Failed to fetch user data");
      }
    };

    fetchUser();
  }, [userId, token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (user.password !== user.confirmPassword) {
      setError("Passwords do not match");
      setSuccess("");
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:3000/api/user/update/${userId}`,
        {
          name: user.name,
          email: user.email,
          password: user.password,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setSuccess("Profile updated successfully");
      setError("");
    } catch (error) {
      console.error("Error updating user:", error);
      setError("Failed to update user");
      setSuccess("");
    }
  };

  return (
    <div className="edit-profile">
      <h2>Edit Profile</h2>
      {success && <p className="success">{success}</p>}
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={user.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={user.password}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={user.confirmPassword}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Update Profile</button>
      </form>
    </div>
    
  );
};


export default EditProfile;
