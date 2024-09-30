

const express = require('express');
const { getCards, addCard, updateCard, deleteCard ,getCardById} = require('../Controllers/cards.Controllers');
const router = express.Router();

// Get all cards
router.get('/', getCards);

// Add a new card
router.post('/', addCard);

// Update a card by ID
router.put('/:id', updateCard);

// Delete a card by ID
router.delete('/:id', deleteCard);

router.get('/:id', getCardById);

module.exports = router;

