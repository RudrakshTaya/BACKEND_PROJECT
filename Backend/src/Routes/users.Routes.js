const express = require('express');
const User = require('../Models/user.Models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs'); // Used for password comparison

const router = express.Router();
const JWT_SECRET = 'your_jwt_secret'; // Replace with a strong secret key

// Sign Up
router.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        let user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        user = new User({ name, email, password }); // Assume the password is hashed in the model
        await user.save();

        res.status(201).json({ msg: 'User registered successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        // Compare the provided password with the hashed password in the database
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        // Generate JWT token
        const payload = {
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            },
        };

        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });

        res.json({ msg: 'Logged in successfully', token, user: payload.user });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Middleware to verify JWT token
const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded.user;
        next();
    } catch (err) {
        res.status(401).json({ msg: 'Invalid token' });
    }
};

// Protected Route Example
router.get('/status', authMiddleware, (req, res) => {
    res.json({ msg: 'User is authenticated', user: req.user });
});

module.exports = router;
