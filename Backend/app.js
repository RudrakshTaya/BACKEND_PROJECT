const express = require('express');
const cors = require('cors');
const connectDB = require('./src/Database/db');

const cardRoutes = require('./src/Routes/cards.Routes');

const app = express();

// Connect to the database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/cards', cardRoutes);

module.exports = app;
