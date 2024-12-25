import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import { loginUserApi } from '../../api/Api'; // Import your API utility
import '../css/login.css';


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
                const errorMsg = error.response?.data?.message || 'Login failed! Please try again.';
                setErrorMessage(errorMsg);
                setFormSubmitted(false);
            }
        }
    };

    return (
        <div className="login-page">
            <div className="container d-flex justify-content-center align-items-center vh-100">
                <div className="row w-100">
                    <div className="col-md-6 d-none d-md-block">
                        <img
                            src="https://erlinks.com/en/wp-content/uploads/2023/08/flat-for-rent.jpg"
                            alt="Login Illustration"
                            className="img-fluid"
                        />
                    </div>
                    <div className="col-md-6">
                        <div className="off-white-container">
                            <h3 className="text-center mb-4">Login</h3>
                            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email</label>
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
                                <button type="submit" className="btn btn-primary w-100">Login</button>
                            </form>
                            <p className="text-center mt-3">
                                Don't have an account? <a href="/register">Register</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;