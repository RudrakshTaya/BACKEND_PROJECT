import React, { useState } from 'react';
import email_icon from '../Assets/email.png';
import password_icon from '../Assets/password.png';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './adminLogin.css';

import { jwtDecode } from 'jwt-decode';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async () => {
        try {
            const response = await axios.post('http://localhost:5002/admin/login', { email, password });

            if (response.data.token) {
                const token = response.data.token;

                // Save the token in localStorage
                localStorage.setItem('token', token);

                // Decode the token to get the user's role
                const decodedToken = jwtDecode(token);

                // Redirect based on the role
                if (decodedToken.role === 'admin') {
                    alert('Logged in successfully!');
                    navigate('/dashboard'); // Admin dashboard route
                } else {
                    alert('Access denied: Admins only!');
                    navigate('/'); // Home or a different route
                }
            } else {
                alert(response.data.msg || 'Login failed. Please try again.');
            }
        } catch (error) {
            console.error('Login error:', error.response?.data || error.message);
            alert('Error logging in. Please check your credentials and try again.');
        }
    };

    return (
        <div className="big-container">
            <div className="container">
                <div className="header">
                    <div className="text">Login</div>
                    <div className="underline"></div>
                </div>
                <div className="inputs">
                    <div className="input">
                        <img src={email_icon} alt="Email Icon" />
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    
                    <div className="input">
                        <img src={password_icon} alt="Password Icon" />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                </div>

                <div className="forget-password">Forgot Password? <span>Click Here!</span></div>

                <div className="submit-container">
                    <button 
                        className="submit" 
                        onClick={handleSubmit}
                    >
                        Login
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;
