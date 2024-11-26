const FoodItem = require('../Models/cards.Models');
const cloudinary = require('../util/cloudinary'); // Import Cloudinary helper
const fs = require('fs'); // To handle file cleanup after uploading

// Add a new food item
const addFoodItem = async (req, res) => {
  try {
    let imageUrl = '';

    // If an image is uploaded, upload it to Cloudinary
    if (req.files && req.files.length > 0) {
      // Assuming multer handles multiple files and the images are available in req.files
      const imagePromises = req.files.map(file =>
        cloudinary.uploadOnCloudinary(file.path) // Cloudinary upload function
      );
      
      const results = await Promise.all(imagePromises);
      imageUrl = results.map(result => result.url); // Store Cloudinary URLs in an array
    }

    const foodItem = new FoodItem({
      ...req.body,
      images: imageUrl.map(url => ({ url, alt: 'Food Image' })), // Store image URLs from Cloudinary
    });

    await foodItem.save();
    res.status(201).json({ message: 'Food item added successfully!', foodItem });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all food items
const getAllFoodItems = async (req, res) => {
  try {
    const foodItems = await FoodItem.find();
    res.status(200).json(foodItems);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single food item by ID
const getFoodItemById = async (req, res) => {
  try {
    const foodItem = await FoodItem.findById(req.params.id);
    if (!foodItem) {
      return res.status(404).json({ message: 'Food item not found' });
    }
    res.status(200).json(foodItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a food item by ID
const updateFoodItem = async (req, res) => {
  try {
    let imageUrl = '';

    // If an image is uploaded, upload it to Cloudinary
    if (req.files && req.files.length > 0) {
      const imagePromises = req.files.map(file =>
        cloudinary.uploadOnCloudinary(file.path)
      );
      
      const results = await Promise.all(imagePromises);
      imageUrl = results.map(result => result.url); // Store Cloudinary URLs in an array
    }

    const foodItem = await FoodItem.findByIdAndUpdate(
      req.params.id,
      { ...req.body, images: imageUrl.map(url => ({ url, alt: 'Food Image' })) }, 
      { new: true, runValidators: true }
    );
    
    if (!foodItem) {
      return res.status(404).json({ message: 'Food item not found' });
    }
    res.status(200).json({ message: 'Food item updated successfully!', foodItem });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a food item by ID
const deleteFoodItem = async (req, res) => {
  try {
    const foodItem = await FoodItem.findByIdAndDelete(req.params.id);
    if (!foodItem) {
      return res.status(404).json({ message: 'Food item not found' });
    }
    
    // If images are associated with the food item, delete them from Cloudinary
    if (foodItem.images && foodItem.images.length > 0) {
      foodItem.images.forEach(async (image) => {
        await cloudinary.v2.uploader.destroy(image.public_id); // Delete from Cloudinary
      });
    }

    res.status(200).json({ message: 'Food item deleted successfully!' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  addFoodItem,
  getAllFoodItems,
  getFoodItemById,
  updateFoodItem,
  deleteFoodItem,
};
