const express = require('express');
const cors = require('cors');
const session = require('express-session');
const connectDB = require('./src/Database/db');
const cardRoutes = require('./src/Routes/cards.Routes');
const userRoutes = require('./src/Routes/users.Routes');
const reviewRoutes = require('./src/Routes/review.Routes');

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
    cookie: { secure: false }
}));

// Routes
app.use('/cards', cardRoutes);
app.use('/users', userRoutes);
app.use('/reviews', reviewRoutes);

module.exports = app;
