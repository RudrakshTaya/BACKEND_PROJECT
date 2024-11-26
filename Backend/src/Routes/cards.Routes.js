

const express = require('express');
const { getCards, addCard, updateCard, deleteCard ,getCardById} = require('../Controllers/cards.Controllers');
const router = express.Router();

// Get all cards
router.get('/', getCards);





router.get('/:id', getCardById);

module.exports = router;

