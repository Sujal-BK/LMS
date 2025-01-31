import React, { useState } from 'react';
import Layout from '../Layout/Layout';
import api from '../../api/axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSentOTP = async () => {
        try {
            const { data } = await api.post('/auth/forgot-password', { email });
            toast.success('OTP sent to your Email');
        } catch (error) {
            console.log(error);
            if (error.response?.data?.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error('OTP not sent');
            }
        }
    };

    const handleChangePassword = async () => {
        try {
            const { data } = await api.post('/auth/verify-otp', {
                email,
                otp,
                newPassword: password,
            });
            toast.success('Password Changed Successfully');
            navigate('/sign-in');
        } catch (error) {
            console.log(error);
            if (error.response?.data?.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error('Your password was not changed');
            }
        }
    };

    return (
        <Layout>
            <div className="flex flex-col items-center justify-center h-screen px-4 bg-gray-50">
                <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
                    <h1 className="text-2xl font-semibold text-center text-gray-700 mb-4">
                        Forgot Password
                    </h1>
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700">
                            Enter Your Email Address
                        </label>
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full mt-1 p-2 border rounded-lg focus:ring focus:ring-blue-300 outline-none"
                        />
                        <button
                            onClick={handleSentOTP}
                            className="w-full mt-4 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition">
                            Send OTP
                        </button>
                    </div>
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700">
                            Enter OTP
                        </label>
                        <input
                            type="text"
                            placeholder="OTP"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            className="w-full mt-1 p-2 border rounded-lg focus:ring focus:ring-blue-300 outline-none"
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700">
                            Enter New Password
                        </label>
                        <input
                            type="password"
                            placeholder="New Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full mt-1 p-2 border rounded-lg focus:ring focus:ring-blue-300 outline-none"
                        />
                    </div>
                    <button
                        onClick={handleChangePassword}
                        className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition">
                        Change Password
                    </button>
                </div>
            </div>
        </Layout>
    );
};

export default ForgotPassword;
