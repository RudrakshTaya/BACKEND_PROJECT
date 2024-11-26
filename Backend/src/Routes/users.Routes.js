const express = require('express');
const User = require('../Models/user.Models');

const router = express.Router();

// Sign Up
router.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        let user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        user = new User({ name, email, password });
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

        if (!user || !(await user.matchPassword(password))) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        req.session.isAuthenticated = true;
        req.session.user = { id: user._id, name: user.name, email: user.email };

        res.json({ msg: 'Logged in successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Check if User is Authenticated
router.get('/status', (req, res) => {
    if (req.session.isAuthenticated) {
        return res.json({ msg: 'User is logged in', user: req.session.user });
    }
    return res.status(401).json({ msg: 'Not logged in' });
});

module.exports = router;
