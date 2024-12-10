import React, { useEffect, useState } from 'react';

// Loading spinner component
const LoadingSpinner = () => <div className="spinner">Loading...</div>;

function Cart() {
  const [cart, setCart] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Centralized function to handle API requests with Authorization header
  const fetchData = async (url, options = {}) => {
    const token = localStorage.getItem('token');
    const response = await fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  };

  // Fetch cart data
  const fetchCart = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetchData('http://localhost:5002/api/cart');
      if (response.ok) {
        const data = await response.json();
        setCart(data);
      } else {
        const errorMessage = await response.text();
        throw new Error(`Failed to fetch cart: ${errorMessage}`);
      }
    } catch (error) {
      console.error('Error fetching cart:', error);
      setError(error.message || 'Failed to load cart. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  // Remove item from cart
  const removeFromCart = async (productId) => {
    const confirmRemove = window.confirm('Are you sure you want to remove this item from your cart?');

    if (!confirmRemove) return;

    try {
      const response = await fetchData(`http://localhost:5002/api/cart/${productId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        alert('Item removed from cart');
        fetchCart(); // Refresh cart after removal
      } else {
        throw new Error('Failed to remove item from cart');
      }
    } catch (error) {
      console.error('Error removing item from cart:', error);
      alert('Failed to remove item. Please try again.');
    }
  };

  // Fetch cart on component mount
  useEffect(() => {
    fetchCart();
  }, []);

  // Loading, error, and empty cart states
  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!cart || cart.items.length === 0) {
    return <div>Your cart is empty.</div>;
  }

  return (
    <div>
      <h1>Your Cart</h1>
      {cart.items.map((item) => (
        <div key={item.productId._id} style={{ marginBottom: '20px', border: '1px solid #ddd', padding: '10px' }}>
          <h2>{item.productId.name}</h2>
          <p>Quantity: {item.quantity}</p>
          <p>Price: ${item.productId.price.toFixed(2)}</p>
          <button
            onClick={() => removeFromCart(item.productId._id)}
            style={{
              backgroundColor: 'red',
              color: 'white',
              padding: '5px 10px',
              border: 'none',
              cursor: 'pointer',
              fontSize: '14px',
            }}
          >
            Remove Item
          </button>
        </div>
      ))}
      <div>
        <h3>
          Total: ${cart.items.reduce((acc, item) => acc + item.productId.price * item.quantity, 0).toFixed(2)}
        </h3>
      </div>
    </div>
  );
}

export default Cart;
