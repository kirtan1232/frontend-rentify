// EditProfile.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const EditProfile = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const token = JSON.parse(localStorage.getItem("user"))?.token;

                if (!token) {
                    console.error("No token found in localStorage");
                    navigate("/login"); // Redirect to login if no token exists
                    return;
                }

                const response = await axios.get(
                    `http://localhost:3000/api/edit/customer/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                if (response.data && response.data.user) {
                    setUser(response.data.user); // Assuming the response contains user data
                } else {
                    console.error("User data not found in response");
                    toast.error("User data not found");
                }
            } catch (error) {
                console.error("Error fetching profile:", error);
                toast.error("Error fetching profile");
            }
        };

        fetchUserProfile();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({ ...prevUser, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = JSON.parse(localStorage.getItem("user"))?.token;

            if (!token) {
                console.error("No token found in localStorage");
                navigate("/login");
                return;
            }

            const response = await axios.put(
                `http://localhost:3000/api/edit/update/${id}`,
                user,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.status === 200) {
                toast.success('Profile updated successfully');
                navigate("/profile");
            } else {
                toast.error('Failed to update profile');
            }
        } catch (error) {
            console.error("Error updating profile:", error);
            toast.error('Error updating profile');
        }
    };

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>Edit Profile</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={user.name}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={user.email}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={user.password || ""}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">Update Profile</button>
            </form>
        </div>
    );
};

export default EditProfile;