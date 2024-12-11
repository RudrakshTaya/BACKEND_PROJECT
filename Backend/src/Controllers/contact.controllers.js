const Contact = require('../Models/contact.model');

// Controller to handle saving the contact form data
exports.saveContactForm = async (req, res) => {
  try {
    const { firstName, lastName, phoneNumber, emailAddress, date, numberOfGuests, comments } = req.body;

    // Create a new contact document
    const newContact = new Contact({
      firstName,
      lastName,
      phoneNumber,
      emailAddress,
      date,
      numberOfGuests,
      comments,
    });

    // Save to database
    await newContact.save();

    // Send success response
    res.status(201).json({ message: 'Reservation details submitted successfully!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Something went wrong. Please try again later.' });
  }
};
