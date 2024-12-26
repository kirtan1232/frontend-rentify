import React, { useState } from 'react';
import { registerUserApi } from '../../api/Api'; // Import your API utility
import '../css/signup.css'; // Import the custom CSS file

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

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

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate the form before submitting
        if (validateForm()) {
            try {
                // Call the register API
                const response = await registerUserApi(formData);

                if (response.data.success) {
                    setSuccessMessage('User registered successfully!');
                    setErrorMessage('');
                    setFormData({
                        name: '',
                        email: '',
                        password: '',
                        confirmPassword: '',
                    });
                }
            } catch (error) {
                const errorMsg = error.response?.data?.message || 'Something went wrong!';
                setErrorMessage(errorMsg);
                setSuccessMessage('');
            }
        }
    };

    return (
        <div className="signup-page">
            <div className="logo-container">
                <img
                    src={require('../../assets/logo/logo.png')} // Adjust the path based on your project structure
                    alt="Rentify Logo"
                    className="logo"
                />
            </div>
            <div className="signup-container">
                <div className="signup-image">
                    <img
                        src="https://erlinks.com/en/wp-content/uploads/2023/08/flat-for-rent.jpg"
                        alt="Sign Up Illustration"
                    />
                </div>
                <div className="signup-form">
                    <h3 className="signup-heading">Create an account</h3>
                    {successMessage && <div className="success-message">{successMessage}</div>}
                    {errorMessage && <div className="error-message">{errorMessage}</div>}
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input
                                type="text"
                                id="name"
                                placeholder="Enter your name"
                                value={formData.name}
                                onChange={handleChange}
                            />
                            {errors.name && <div className="error-text">{errors.name}</div>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                placeholder="Enter your email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                            {errors.email && <div className="error-text">{errors.email}</div>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                placeholder="Enter your password"
                                value={formData.password}
                                onChange={handleChange}
                            />
                            {errors.password && <div className="error-text">{errors.password}</div>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="confirmPassword">Re-type Password</label>
                            <input
                                type="password"
                                id="confirmPassword"
                                placeholder="Re-type password"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                            />
                            {errors.confirmPassword && <div className="error-text">{errors.confirmPassword}</div>}
                        </div>
                        <button type="submit" className="submit-button">Create Account</button>
                    </form>
                    <p className="text-center">
                        Already have an account? <a href="/login" className="link">Login</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;
