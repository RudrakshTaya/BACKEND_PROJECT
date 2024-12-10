const express = require('express');
const cors = require('cors');
const session = require('express-session');
const connectDB = require('./src/Database/db');
const cardRoutes = require('./src/Routes/cards.Routes');
const userRoutes = require('./src/Routes/users.Routes');
const reviewRoutes = require('./src/Routes/review.Routes');
const adminRoutes = require('./src/Routes/admin.routes');
const cartRoutes =require('./src/Routes/cart.routes');

const app = express();

// Connect to the database
connectDB();



// Middleware
app.use(cors());

app.use(express.json());

app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,  // Helps prevent XSS attacks
        secure: false,   // Set to true if using HTTPS in production
        maxAge: 1000 * 60 * 60 * 24,  // 1 day expiration for session cookies
    },
}));

// Routes
app.use('/cards', cardRoutes);
app.use('/users', userRoutes);
app.use('/api', reviewRoutes);
app.use('/admin', adminRoutes);
app.use('/api/cart', cartRoutes);
// Logout Route
app.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ msg: 'Error logging out' });
        }
        res.json({ msg: 'Logged out successfully' });
    });
});

module.exports = app;
