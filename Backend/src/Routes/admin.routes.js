const express = require('express');
const router = express.Router();
const upload = require('../MIddleware/multerMiddleware'); // Import the multer middleware
const {
  addFoodItem,
  getAllFoodItems,
  getFoodItemById,
  updateFoodItem,
  deleteFoodItem,
} = require('../Controllers/admin.controllers');

const { adminLogin } = require('../Controllers/admin.login');

// Admin login route
router.post('/login', adminLogin);

// Add a new food item
router.post('/', upload.array('images', 10), addFoodItem);

// Get all food items
router.get('/', getAllFoodItems);

// Get a specific food item by ID
router.get('/:id', getFoodItemById);

// Update a food item by ID
router.put('/:id', upload.array('images', 10), updateFoodItem);

// Delete a food item by ID
router.delete('/:id', deleteFoodItem);

module.exports = router;
