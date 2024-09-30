import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Menu.css';
import './cards.css';
import './DeleteCard.css';

function Menu() {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    // Fetch cards from the backend
    const fetchCards = async () => {
      try {
        const response = await fetch('http://localhost:5002/cards');
        if (response.ok) {
          const data = await response.json();
          setCards(data);
        } else {
          console.error('Failed to fetch cards');
        }
      } catch (error) {
        console.error('Error fetching cards:', error);
      }
    };

    fetchCards();
  }, []);

  const handleDelete = async (cardId) => {
    try {
      const response = await fetch(`http://localhost:5002/cards/${cardId}`, { method: 'DELETE' });
      if (response.ok) {
        setCards(cards.filter(card => card._id !== cardId));
        alert('Card deleted successfully');
      } else {
        alert('Failed to delete card');
      }
    } catch (error) {
      console.error('Error deleting card:', error);
    }
  };

  return (
    <div className='menu-page'>
      <header className='height-50 mt-5'>
        <div className='container h-100 d-flex align-items-center justify-content-center' style={{ backgroundColor: 'rgba(255, 255, 255, 0.01)', color: 'white' }}>
          <h1 className='text-light'>Menu</h1>
          <Link to="/add-card" className="btn btn-primary">Add New Card</Link>
        </div>
      </header>
      <div className="card-container">
        {cards.map((card) => (
          <div className="card" key={card._id}>
            <Link to={`/cards/${card._id}`} className="card-link">
              <div>
                <img src={card.imgSrc} alt={card.title} className="card-image" />
              </div>
              <div className='card-lower'>
                <div className='card-left'>
                  <div className="card-title">{card.title}</div>
                  <div className="card-body">{card.text}</div>
                </div>
                <div className='card-right'>
                  <div className="card-price">{card.price}</div>
                  <div className="card-rating">{card.rating}★</div>
                </div>
              </div>
            </Link>
            <button onClick={() => handleDelete(card._id)}>Delete</button>
            <Link to={`/update-card/${card._id}`} className="btn btn-secondary">Update</Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Menu;
