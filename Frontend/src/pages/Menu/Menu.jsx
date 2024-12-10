import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Menu.css';
import './cards.css';

function Menu() {
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null); // For success/error messages

  // Fetch cards on mount
  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await fetch('http://localhost:5002/cards');
        if (response.ok) {
          const data = await response.json();
          setCards(data);
        } else {
          throw new Error('Failed to fetch menu items');
        }
      } catch (error) {
        setError('Error fetching menu items. Please try again later.');
        console.error('Error fetching menu items:', error);
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
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Assuming token is stored in localStorage
        },
        body: JSON.stringify({
          productId: card._id,
          quantity: 1, // Default quantity
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setMessage(`Added "${card.name}" to cart successfully!`);
      } else {
        throw new Error('Failed to add item to cart');
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      setMessage('Could not add item to cart. Please try again later.');
    }
  };

  if (isLoading) {
    return <div className="loading">Loading menu items...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className='menu-page'>
      <header className='height-50 mt-5'>
        <div
          className='container h-100 d-flex align-items-center justify-content-center'
        >
          <h1>Our Menu</h1>
        </div>
      </header>

      {message && <div className="message">{message}</div>}

      <div className="card-container">
        {cards.map((card) => (
          <div className="card" key={card._id}>
            <Link to={`/cards/${card._id}`} className="card-link">
              <div>
                <img
                  src={card.images[0]?.url || '/default-image.jpg'}
                  alt={card.name}
                  className="card-image"
                />
              </div>
              <div className="card-title">{card.name}</div>
            </Link>
            <div className="card-lower">
              <div className="card-left">
                <div className="card-body">{card.description}</div>
                <div className="card-price">${card.price.toFixed(2)}</div>
              </div>
              <div className="card-right">
                <button
                  className="add-to-cart-btn"
                  onClick={() => handleAddToCart(card)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Menu;
