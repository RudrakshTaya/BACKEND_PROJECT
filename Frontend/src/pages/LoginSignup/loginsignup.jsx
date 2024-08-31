import React, { useState } from 'react';
import email_icon from '../../components/Assets/email.png';
import password_icon from '../../components/Assets/password.png';
import person_icon from '../../components/Assets/person.png';
import { useNavigate } from 'react-router-dom';
import './loginsignup.css';

const LoginSignup = () => {
    const [action, setAction] = useState("Login"); // Default to Login
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = () => {
        if (action === "Login") {
            // Handle Login logic here
            if (email === 'user@example.com' && password === 'password') { // Replace with real authentication logic
                localStorage.setItem('isAuthenticated', 'true');
                navigate('/');
            } else {
                alert('Invalid email or password');
            }
        } else {
            // Handle Sign Up logic here
            // Normally, you would send the data to a backend server for sign-up
            console.log('Name:', name);
            console.log('Email:', email);
            console.log('Password:', password);
            alert('Signed Up successfully!');
            setAction('Login');
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
                            <img src={person_icon} alt="" />
                            <input
                                type="text"
                                placeholder='Name'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                    )}
                
                    <div className="input">
                        <img src={email_icon} alt="" />
                        <input
                            type="email"
                            placeholder='Email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                        
                    <div className="input">
                        <img src={password_icon} alt="" />
                        <input
                            type="password"
                            placeholder='Password'
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
}

export default LoginSignup;
