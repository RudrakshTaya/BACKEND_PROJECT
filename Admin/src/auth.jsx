import React from 'react';
import { Navigate } from 'react-router-dom';

import { jwtDecode } from 'jwt-decode';

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('token');

    // Check if token exists and decode it
    if (!token) {
        alert('Login in required ');
        return <Navigate to="/" />;
    }

    try {
        const decodedToken = jwtDecode(token);
        
        // Check if the user is an admin
        if (decodedToken.role === 'admin') {
            return children;
        } else {
            alert('Access denied. Admins only!');
            return <Navigate to="/" />;
        }
    } catch (error) {
        console.error('Invalid token:', error);
        return <Navigate to="/login" />;
    }
};

export default ProtectedRoute;
