const mongoose = require('mongoose');

const foodItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  category: {
    type: String,
    required: true,
    enum: ['Starter', 'Main Course', 'Dessert', 'Beverage', 'Snack'],
  },

  stock: {
    type: Number,
  
    min: 0,
  },
  images: [
    {
      url: { type: String, required: true },
      alt: { type: String, default: 'Food Image' },
    },
  ],
  isVegan: {
    type: Boolean,
    default: false,
  },

  ratings: {
    averageRating: { type: Number, default: 0, min: 0, max: 5 },
    reviewCount: { type: Number, default: 0 },
  },
  discount: {
    percentage: { type: Number, min: 0, max: 100, default: 0 },
    expiryDate: { type: Date },
  },
}, { timestamps: true });

module.exports = mongoose.model('FoodItem', foodItemSchema);
