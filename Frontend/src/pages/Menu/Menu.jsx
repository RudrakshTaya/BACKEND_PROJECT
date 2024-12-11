import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Menu.css';
import './cards.css';

function Menu() {
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  // Fetch cards on component mount
  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await fetch('http://localhost:5002/cards');
        if (!response.ok) {
          throw new Error('Failed to fetch menu items');
        }
        const data = await response.json();
        setCards(data);
      } catch (err) {
        setError(err.message || 'Error fetching menu items. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCards();
  }, []);

  // Handle add to cart
  const handleAddToCart = async (card) => {
    try {
      const response = await fetch('http://localhost:5002/api/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ productId: card._id, quantity: 1 }),
      });

      if (!response.ok) {
        throw new Error('Failed to add item to cart');
      }

      const data = await response.json();
      setMessage(`Added "${card.name}" to cart successfully!`);
      setTimeout(() => setMessage(null), 3000); // Clear the message after 3 seconds
    } catch (err) {
      console.error('Error adding to cart:', err);
      setMessage('Could not add item to cart. Please try again later.');
      setTimeout(() => setMessage(null), 3000); // Clear the message after 3 seconds
    }
  };

  // Display loader, error, or the menu
  if (isLoading) return <div className="loading">Loading menu items...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="menu-page">
      <header className="menu-header">
        <div className="container">
          <h1>Our Menu</h1>
        </div>
      </header>

      {message && <div className="message">{message}</div>}

      <div className="card-container">
        {cards.map((card) => (
          <div className="card" key={card._id}>
            <Link to={`/cards/${card._id}`} className="card-link">
              <img
                src={card.images[0]?.url || '/default-image.jpg'}
                alt={card.name}
                className="card-image"
              />
              <h2 className="card-title">{card.name}</h2>
            </Link>
            <div className="card-lower">
              <div className="card-details">
                <p className="card-description">{card.description}</p>
                <p className="card-price">${card.price.toFixed(2)}</p>
              </div>
              <button
                className="add-to-cart-btn"
                onClick={() => handleAddToCart(card)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Menu;
