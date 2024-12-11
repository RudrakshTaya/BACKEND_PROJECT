const express = require('express');
const router = express.Router();
const { saveContactForm } = require('../Controllers/contact.controllers');

// POST route to submit the contact form
router.post('/submit', saveContactForm);

module.exports = router;
