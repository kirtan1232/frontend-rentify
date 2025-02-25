import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import forgotBg from '../../assets/images/forgotbg.png'; // Import local image

const ResetPassword = () => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const { search } = useLocation();
    const navigate = useNavigate();
    const token = new URLSearchParams(search).get('token');

    useEffect(() => {
        if (!token) {
            navigate('/forgot-password');
        }
    }, [token, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            setMessage('Passwords do not match.');
            return;
        }

        setLoading(true);
        try {
            const response = await axios.post('http://localhost:3000/api/auth/reset-password', { token, newPassword });
            setMessage(response.data.msg);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            setMessage(error.response ? error.response.data.msg : 'An error occurred');
        }
    };

    return (
        <div
            className="flex justify-center items-center min-h-screen bg-cover bg-center"
            style={{
                backgroundImage: `url(${forgotBg})`, // Use the local image
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <div className="w-full max-w-md bg-white/90 backdrop-blur-lg p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-center mb-4">Reset Password</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">New Password</label>
                        <input
                            type="password"
                            id="newPassword"
                            name="newPassword"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-500 text-white font-bold py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        {loading ? 'Resetting...' : 'Reset Password'}
                    </button>
                </form>
                {message && <p className="mt-4 text-center text-green-500 font-semibold">{message}</p>}
            </div>
        </div>
    );
};

export default ResetPassword;
