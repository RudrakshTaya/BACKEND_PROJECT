import React, { useState } from 'react';
import email_icon from '../../components/Assets/email.png';
import password_icon from '../../components/Assets/password.png';
import person_icon from '../../components/Assets/person.png';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './loginsignup.css';

const LoginSignup = () => {
    const [action, setAction] = useState("Login"); // Default to Login
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async () => {
        if (action === "Login") {
            try {
                const response = await axios.post('http://localhost:5002/users/login', { email, password });
                if (response.status === 200) {
                    const { token, user } = response.data; // Assuming response contains token and user data
                    localStorage.setItem('token', token);
                    localStorage.setItem('user', JSON.stringify(user));
                    alert('Login successful!');
                    navigate('/'); // Redirect to home or dashboard
                } else {
                    alert(response.data.msg || 'Login failed');
                }
            } catch (error) {
                alert('Error logging in. Please check your credentials and try again.');
                console.error(error);
            }
        } else {
            try {
                const response = await axios.post('http://localhost:5002/users/signup', { name, email, password });
                if (response.status === 201) {
                    alert('Signup successful! Please log in.');
                    setAction('Login');
                } else {
                    alert(response.data.msg || 'Signup failed');
                }
            } catch (error) {
                alert('Error signing up. Please try again.');
                console.error(error);
            }
        }
    };

    return (
        <div className="big-container">
            <div className="container">
                <div className="header">
                    <div className="text">{action}</div>
                    <div className="underline"></div>
                </div>
                <div className="inputs">
                    {action === "Sign Up" && (
                        <div className="input">
                            <img src={person_icon} alt="Name Icon" />
                            <input
                                type="text"
                                placeholder="Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                    )}
                
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

                {action === "Login" && (
                    <div className="forget-password">Forgot Password? <span>Click Here!</span></div>
                )}
            
                <div className="submit-container">
                    <button 
                        className={action === "Sign Up" ? "submit" : "submit grey"} 
                        onClick={() => action === "Sign Up" ? handleSubmit() : setAction("Sign Up")}
                    >
                        Sign Up
                    </button>
                    <button 
                        className={action === "Login" ? "submit" : "submit grey"} 
                        onClick={() => action === "Login" ? handleSubmit() : setAction("Login")}
                    >
                        Login
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LoginSignup;
