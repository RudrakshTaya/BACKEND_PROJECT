const express = require('express');
const { addToCart, getCart, removeFromCart, updateCartItemQuantity } = require('../Controllers/cart.controllers');
const authMiddleware = require('../MIddleware/auth.middleware');

const router = express.Router();

// Add item to cart
router.post('/', authMiddleware, addToCart);

// Get cart
router.get('/', authMiddleware, getCart);

// Remove item from cart
router.delete('/:productId', authMiddleware, removeFromCart);


module.exports = router;
