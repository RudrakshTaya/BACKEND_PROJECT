const Cart = require('../Models/cart.model');
const Product = require('../Models/cards.Models');

// Add item to cart
exports.addToCart = async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.user.id; // Assumes userId is stored in the token

  try {
    // Validate product existence
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Check if cart exists for user
    let cart = await Cart.findOne({ userId });

    if (cart) {
      // Update quantity if product already exists in cart
      const itemIndex = cart.items.findIndex((item) => item.productId.toString() === productId);
      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity;
      } else {
        // Add new product to cart
        cart.items.push({ productId, quantity });
      }
    } else {
      // Create a new cart for the user
      cart = new Cart({
        userId,
        items: [{ productId, quantity }],
      });
    }

    await cart.save();
    const populatedCart = await cart.populate({
      path: 'items.productId',
      select: 'name price images',
    });
    res.status(200).json({ message: 'Item added to cart successfully', cart: populatedCart });
  } catch (error) {
    console.error('Error adding item to cart:', error);
    res.status(500).json({ message: 'Error adding item to cart' });
  }
};

// Get cart for a user
exports.getCart = async (req, res) => {
  const userId = req.user.id;

  try {
    const cart = await Cart.findOne({ userId }).populate({
      path: 'items.productId',
      select: 'name price images',
    });
    if (!cart || cart.items.length === 0) {
      return res.status(404).json({ message: 'Cart is empty' });
    }

    res.status(200).json(cart);
  } catch (error) {
    console.error('Error fetching cart:', error);
    res.status(500).json({ message: 'Error fetching cart' });
  }
};

// Remove item from cart
exports.removeFromCart = async (req, res) => {
  const { productId } = req.body;
  const userId = req.user.id;

  try {
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const itemIndex = cart.items.findIndex((item) => item.productId.toString() === productId);
    if (itemIndex === -1) {
      console.error('Product not found in cart:', { productId, cartItems: cart.items });
      return res.status(404).json({ message: 'Product not found in cart' });
    }

    cart.items.splice(itemIndex, 1); // Remove the item

    await cart.save();
    const updatedCart = await cart.populate({
      path: 'items.productId',
      select: 'name price images',
    });
    res.status(200).json({ message: 'Item removed from cart successfully', cart: updatedCart });
  } catch (error) {
    console.error('Error removing item from cart:', error);
    res.status(500).json({ message: 'Error removing item from cart' });
  }
};
