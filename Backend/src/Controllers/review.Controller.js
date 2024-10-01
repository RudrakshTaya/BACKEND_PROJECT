// src/Controllers/review.Controllers.js

const Review = require('../Models/review.Models');

// Fetch all reviews
const getReviews = async (req, res) => {
    try {
        const reviews = await Review.find();
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Add a new review
const addReview = async (req, res) => {
    const { title, content, rating } = req.body;
    const review = new Review({ title, content, rating: parseInt(rating) });
    try {
        const newReview = await review.save();
        res.status(201).json(newReview);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update a review by ID
const updateReview = async (req, res) => {
    try {
        const review = await Review.findById(req.params.id);
        if (!review) return res.status(404).json({ message: 'Review not found' });

        review.title = req.body.title || review.title;
        review.content = req.body.content || review.content;
        review.rating = req.body.rating !== undefined ? parseInt(req.body.rating) : review.rating;

        const updatedReview = await review.save();
        res.json(updatedReview);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a review by ID
const deleteReview = async (req, res) => {
    try {
        const review = await Review.findById(req.params.id);
        if (!review) return res.status(404).json({ message: 'Review not found' });

        await review.remove();
        res.json({ message: 'Review deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getReviews, addReview, updateReview, deleteReview };
