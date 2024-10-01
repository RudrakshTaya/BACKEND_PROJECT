// src/Routes/review.Routes.js
const express = require('express');
const { getReviews, addReview, updateReview, deleteReview } = require('../Controllers/review.Controller');
const router = express.Router();

// Make sure these functions exist in review.Controllers.js
router.get('/reviews', getReviews);
router.post('/reviews', addReview);
router.put('/:id', updateReview);
router.delete('/:id', deleteReview);

module.exports = router;
