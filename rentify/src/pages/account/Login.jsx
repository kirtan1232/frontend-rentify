import React, { useState } from 'react';
import { loginUserApi } from '../../api/Api'; // Import your API utility
import '../css/login.css'; // Import the custom CSS file

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [errors, setErrors] = useState({});
    const [formSubmitted, setFormSubmitted] = useState(false);
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

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validateForm()) {
            try {
                // Call the login API
                const response = await loginUserApi(formData);

                if (response.data.success) {
                    setFormSubmitted(true);
                    setErrorMessage('');
                    alert('Login successful');
                    // Store token and redirect to the dashboard or desired page
                    localStorage.setItem('token', response.data.token);
                    window.location.href = '/';
                }
            } catch (error) {
                console.error('Error during login:', error);
                const errorMsg = error.response?.data?.message || 'Login failed! Please try again.';
                setErrorMessage(errorMsg);
                setFormSubmitted(false);
            }
        }
    };

    return (
        <div className="login-page">
            <div className="logo-container">
                <img
                    src={require('../../assets/icons/logo.png')} // Adjust the path based on your project structure
                    alt="Logo"
                    className="logo"
                />
            </div>
            <div className="login-container">
                {/* Add the image element here */}
                <div className="image-container">
                    <img
                        src="https://erlinks.com/en/wp-content/uploads/2023/08/flat-for-rent.jpg" // Update the URL with your image location
                        alt="Login Illustration"
                        className="login-image"
                    />
                </div>
                <h3 className="login-heading">Login</h3>
                {errorMessage && (
                    <div className="mb-4 text-red-600 bg-red-100 p-3 rounded">{errorMessage}</div>
                )}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="input-field"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                        {errors.email && <div className="error-text">{errors.email}</div>}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="input-field"
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                        {errors.password && <div className="error-text">{errors.password}</div>}
                    </div>
                    <button type="submit" className="submit-button">
                        Login
                    </button>
                </form>
                <p className="text-center mt-4 text-sm">
                    Don't have an account?{' '}
                    <a href="/register" className="link">
                        Register
                    </a>
                </p>
            </div>
        </div>
    );
};

export default Login;
