const jwt = require('jsonwebtoken');

// Predefined admin credentials
const ADMIN_EMAIL = "taya@gmail.com";
const ADMIN_PASSWORD = "12345678";

// JWT secret key
const JWT_SECRET = "your_jwt_secret_key"; // Replace with a strong secret key

// Admin login controller
const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Validate admin credentials
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      // Generate JWT token
      const token = jwt.sign({ role: "admin" }, JWT_SECRET, { expiresIn: "1d" });

      return res.status(200).json({
        message: "Admin logged in successfully!",
        token, // Return the token for client to store
      });
    } else {
      return res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  adminLogin,
};
