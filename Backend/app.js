const express = require('express');
const cors = require('cors');
const session = require('express-session');
const connectDB = require('./src/Database/db');
const cardRoutes = require('./src/Routes/cards.Routes');
const userRoutes = require('./src/Routes/users.Routes'); // Import user routes

const app = express();

// Connect to the database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Session setup
app.use(session({
    secret: 'your_secret_key', // Replace with a secure secret key
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } // Set to true if using HTTPS
}));

// Routes
app.use('/cards', cardRoutes);
app.use('/users', userRoutes); // Add user-related routes

module.exports = app;
