import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import '../css/register.css';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [errors, setErrors] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [formSubmitted, setFormSubmitted] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        });
    };

    const validateForm = () => {
        const newErrors = {};

        // Check if all fields are filled
        Object.keys(formData).forEach((key) => {
            if (!formData[key]) {
                newErrors[key] = `${key.charAt(0).toUpperCase() + key.slice(1)} is required`;
            }
        });

        // Check if passwords match
        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate the form before submitting
        if (validateForm()) {
            setFormSubmitted(true);
            alert('Form submitted successfully');
            // You can proceed with form submission here
        } else {
            setFormSubmitted(false);
        }
    };

    return (
        <div className="signup-page">
            <div className="container d-flex justify-content-center align-items-center vh-100">
                <div className="row w-100">
                    <div className="col-md-6 d-none d-md-block">
                        <img
                            src="https://i.pinimg.com/736x/d3/42/dd/d342dd4f3ac0c2a88d4be645b0c5f1ca.jpg" // Replace with the image URL or import locally
                            alt="Sign Up Illustration"
                            className="img-fluid"
                        />
                    </div>
                    <div className="col-md-6">
                        <div className="off-white-container">
                            <h3 className="text-center mb-4">Create an account</h3>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        className="form-control"
                                        placeholder="Enter your name"
                                        value={formData.name}
                                        onChange={handleChange}
                                    />
                                    {errors.name && <div className="text-danger">{errors.name}</div>}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email or Phone Number</label>
                                    <input
                                        type="email"
                                        id="email"
                                        className="form-control"
                                        placeholder="Enter your email"
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                    {errors.email && <div className="text-danger">{errors.email}</div>}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input
                                        type="password"
                                        id="password"
                                        className="form-control"
                                        placeholder="Enter your password"
                                        value={formData.password}
                                        onChange={handleChange}
                                    />
                                    {errors.password && <div className="text-danger">{errors.password}</div>}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="confirm-password" className="form-label">Re-type Password</label>
                                    <input
                                        type="password"
                                        id="confirmPassword"
                                        className="form-control"
                                        placeholder="Re-type password"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                    />
                                    {errors.confirmPassword && <div className="text-danger">{errors.confirmPassword}</div>}
                                </div>
                                <button type="submit" className="btn btn-primary w-100">Create Account</button>
                            </form>
                            <p className="text-center mt-3">
                                Already have an account? <a href="/login">Login</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;