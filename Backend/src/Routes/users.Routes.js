const express = require('express');
const User = require('../Models/user.Models');

const router = express.Router();

// Sign Up Route
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

// Login Route
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

// Logout Route
router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) return res.status(500).send('Server Error');
        res.clearCookie('connect.sid');
        res.json({ msg: 'Logged out successfully' });
    });
});

module.exports = router;
