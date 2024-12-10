const jwt = require('jsonwebtoken');
require('dotenv').config(); // Load environment variables
const JWT_SECRET = 'your_jwt_secret'; // Replace with a strong secret key
const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token,JWT_SECRET); // Use the secret from environment variables
        req.user = decoded.user;
        next();
    } catch (err) {
        console.error('JWT Verification Error:', err.message);
        res.status(401).json({ msg: 'Invalid token' });
    }
};

module.exports = authMiddleware;
