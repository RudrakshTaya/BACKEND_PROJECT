// routes/orderRoutes.js
const express = require('express');
const  placeOrder  = require('../Controllers/placeorder');
const authMiddleware = require('../MIddleware/auth.middleware'); // Ensure the user is authenticated

const router = express.Router();

// Route to place an order
router.post('/checkout', authMiddleware, placeOrder);

module.exports = router;
