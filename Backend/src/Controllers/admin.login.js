const jwt = require('jsonwebtoken');


const ADMIN_EMAIL = "taya@gmail.com";
const ADMIN_PASSWORD = "12345678";


const JWT_SECRET = "your_jwt_secret_key"; 


const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      
      const token = jwt.sign({ role: "admin" }, JWT_SECRET, { expiresIn: "1d" });

      return res.status(200).json({
        message: "Admin logged in successfully!",
        token, 
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
