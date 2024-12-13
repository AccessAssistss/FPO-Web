import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import { setUserEmail } from './UserSlice';
import { useLoginApi } from './LoginAction';
import img from '../../assets/6078257.jpg'

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const userLoginLoading = useSelector(state => state.user.userLoginLoading)
    const { login } = useLoginApi()
    const [error, setError] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);


    const handleLogin = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            Swal.fire('Error', 'Please fill in both email and password.', 'error');
            return;
        } else {
            const data = {
                email: email,
                password: password,
                user_type: "fpo"
            }
            login(data)
        };
    }

    useEffect(() => {
        const accessToken = localStorage.getItem('access_token');

        if (accessToken) {
            navigate('/'); // Navigate if there's no token
            return;
        }
    }, [])
    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="w-full h-screen flex">
                {/* Left side for Image */}
                <div className="w-1/2 hidden md:block">
                    <img
                        src={img}
                        alt="Login Image"
                        className="w-full h-full"
                    />
                </div>

                {/* Right side for Login Form */}
                <div className="w-full md:w-1/2 md:px-20 bg-white p-5 rounded-2xl shadow-lg flex justify-center flex-col">
                    <h1 className="md:text-4xl text-xl font-bold text-[#00B251] text-center mb-4">
                        Log In
                    </h1>

                    {error && <div className="text-red-500 text-center mb-4">{error}</div>}

                    <form className="grid grid-cols-1 gap-4" onSubmit={handleLogin}>
                        <div>
                            <label className="block text-gray-700 font-medium mb-2">Email Id</label>
                            <input
                                type="email"
                                placeholder="Enter Your Email Id"
                                className="w-full p-3 border rounded-md"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-medium mb-2">Password</label>
                            <div className="relative">
                                <input
                                    type="password"
                                    placeholder="Enter Your Password"
                                    className="w-full p-3 border rounded-md"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>
                    </form>

                    <div className="my-3">
                        <button
                            onClick={() => navigate("/forgetpassword")}
                            className="text-[#00B251] md:text-lg"
                        >
                            Forget password
                        </button>
                    </div>

                    <div className="mt-8 text-center">
                        <button
                            onClick={handleLogin}
                            type="submit"
                            className={`bg-[#00B251] text-white text-lg font-medium py-3 px-8 rounded-md hover:bg-[#00B251] md:w-1/2 transform hover:scale-105 transition-transform duration-300 ${userLoginLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                            disabled={userLoginLoading}
                        >
                            {userLoginLoading ? 'Logging In...' : 'Log In'}
                        </button>
                    </div>

                    <div className="flex items-center justify-center space-x-2 mt-8">
                        <p className="md:text-lg text-gray-700">Create account.</p>
                        <button onClick={() => navigate("/ragistration")} className="text-[#00B251] md:text-lg">Sign up</button>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default Login;
