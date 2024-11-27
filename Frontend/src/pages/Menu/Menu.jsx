import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Menu.css';
import './cards.css';

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

  return (
    <div className='menu-page'>
      <header className='height-50 mt-5'>
        <div
          className='container h-100 d-flex align-items-center justify-content-center'
          style={{ backgroundColor: 'rgba(255, 255, 255, 0.01)', color: 'white' }}
        >
          <h1 className='text-light'>Menu</h1>
        </div>
      </header>
      <div className="card-container">
        {cards.map((card) => (
          <div className="card" key={card._id}>
            <Link to={`/cards/${card._id}`} className="card-link">
              <div>
                <img src={card.images[0].url} alt={card.name} className="card-image" />
              </div>
              <div className='card-lower'>
                <div className='card-left'>
                  <div className="card-title">{card.name}</div>
                  <div className="card-body">{card.description}</div>
                  <div className="card-body">${card.price}</div>
                  

                </div>
                <div className='card-right'>
                  
                 
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Menu;
