import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Loading spinner component
const LoadingSpinner = () => <div className="spinner">Loading...</div>;

function Cart() {
  const [cart, setCart] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Centralized function to handle API requests with Authorization header
  const fetchData = async (url, options = {}) => {
    const token = localStorage.getItem('token');
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        ...options.headers,
      },
    });
    if (!response.ok) {
      throw new Error(await response.text());
    }
    return response.json();
  };

  // Fetch cart data
  const fetchCart = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchData('http://localhost:5002/api/cart');
      setCart(data);
    } catch (error) {
      console.error('Error fetching cart:', error.message);
      setError(error.message || 'Failed to load cart. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  // Remove item from cart
  const removeFromCart = async (productId) => {
    if (!window.confirm('Are you sure you want to remove this item from your cart?')) return;

    try {
      await fetchData(`http://localhost:5002/api/cart/remove`, {
        method: 'POST',
        body: JSON.stringify({ productId }),
      });
      alert('Item removed from cart');
      setCart((prevCart) => ({
        ...prevCart,
        items: prevCart.items.filter((item) => item.productId._id !== productId),
      }));
    } catch (error) {
      console.error('Error removing item from cart:', error.message);
      alert(error.message || 'Failed to remove item. Please try again.');
    }
  };

  const handleCheckout = async () => {
    try {
      const totalPrice = parseFloat(
        cart.items.reduce((acc, item) => acc + item.productId.price * item.quantity, 0).toFixed(2)
      );
  
      const response = await fetchData('http://localhost:5002/api/order/checkout', {
        method: 'POST',
        body: JSON.stringify({
          items: cart.items.map((item) => ({
            productId: item.productId._id,
            quantity: item.quantity,
          })),
          totalPrice,
        }),
      });
  
      if (response.success) {
        navigate('/confirmation', { state: { orderId: response.orderId } });
      } else {
        alert('Checkout failed. Please try again later.');
      }
    } catch (error) {
      console.error('Error during checkout:', error.message);
      alert('An error occurred during checkout. Please try again later.');
    }
  };
  

  // Clear cart function
  const clearCart = async () => {
    if (!window.confirm('Are you sure you want to clear your entire cart?')) return;

    try {
      await fetchData('http://localhost:5002/api/cart/clear', { method: 'POST' });
      setCart({ items: [] });
      alert('Cart cleared successfully');
    } catch (error) {
      console.error('Error clearing cart:', error.message);
      alert('Failed to clear cart. Please try again later.');
    }
  };

  // Fetch cart on component mount
  useEffect(() => {
    fetchCart();
  }, []);

  // Loading, error, and empty cart states
  if (isLoading) return <LoadingSpinner />;
  if (error) return <div className="error">{error}</div>;
  if (!cart || cart.items.length === 0) return <div>Your cart is empty.</div>;

  return (
    <div className="cart-container">
      <h1>Your Cart</h1>
      <div className="cart-items">
        {cart.items.map((item) => (
          <div
            key={item.productId._id}
            className="cart-item"
          >
            <h2>{item.productId.name}</h2>
            <p>Quantity: {item.quantity}</p>
            <p>Price: ${item.productId.price.toFixed(2)}</p>
            <button
              onClick={() => removeFromCart(item.productId._id)}
              className="remove-button"
            >
              Remove Item
            </button>
          </div>
        ))}
      </div>
      <div className="total">
        <h3>
          Total: $
          {cart.items
            .reduce((acc, item) => acc + item.productId.price * item.quantity, 0)
            .toFixed(2)}
        </h3>
      </div>
      <div className="checkout-buttons">
        <button
          onClick={handleCheckout}
          className="checkout-button"
        >
          Checkout
        </button>
        <button
          onClick={clearCart}
          className="clear-cart-button"
        >
          Clear Cart
        </button>
      </div>
    </div>
  );
}

export default Cart;