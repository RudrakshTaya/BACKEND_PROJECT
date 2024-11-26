const Card = require('../Models/cards.Models');

// Get all cards
exports.getCards = async (req, res) => {
  try {
    const cards = await Card.find();
    res.status(200).json(cards);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.getCardById = async (req, res) => {
  const { id } = req.params;
  try {
    const card = await Card.findById(id);
    if (!card) {
      return res.status(404).json({ error: 'Card not found' });
    }
    res.status(200).json(card);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch card details' });
  }
};



