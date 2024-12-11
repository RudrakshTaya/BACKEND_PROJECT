const Product = require('../Models/cards.Models'); // Import the Product model
const Order = require('../Models/placeorder'); // Import the Order model

const placeOrder = async (req, res) => {
  const { items, totalPrice } = req.body; // Cart items and total price from frontend
  const userId = req.user._id; // Get logged-in user's ID

  try {
    if (!items || items.length === 0) {
      return res.status(400).json({ error: 'Cart is empty. Cannot place order.' });
    }

    let calculatedTotalAmount = 0;
    const processedItems = [];

    for (const item of items) {
      const { productId, quantity } = item;

      if (!productId || !quantity) {
        return res.status(400).json({ error: 'Missing productId or quantity for items.' });
      }

      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({ error: `Product with ID ${productId} not found.` });
      }

      if (product.stock < quantity) {
        return res.status(400).json({ error: `Not enough stock for ${product.name}.` });
      }

      product.stock -= quantity;
      await product.save();

      const price = product.price; // Fetch price from the product
      calculatedTotalAmount += price * quantity;

      processedItems.push({ productId, quantity, price });
    }

    if (totalPrice !== calculatedTotalAmount.toFixed(2)) {
      return res.status(400).json({ error: 'Total price mismatch. Please check your cart.' });
    }

    const newOrder = new Order({
      userId,
      items: processedItems,
      totalAmount: calculatedTotalAmount,
    });

    await newOrder.save();

    return res.status(200).json({
      success: true,
      orderId: newOrder._id,
      totalAmount: calculatedTotalAmount,
      message: 'Order placed successfully!',
    });
  } catch (error) {
    console.error('Error placing order:', error.message);
    res.status(500).json({ error: 'Failed to place the order. Please try again later.' });
  }
};

module.exports = placeOrder;
