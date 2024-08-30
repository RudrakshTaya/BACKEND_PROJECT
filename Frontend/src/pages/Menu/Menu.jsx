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
        <div className='container h-100 d-flex align-items-center justify-content-center'>
          <h1 className='text-light'>Menu</h1>
        </div>
      </header>
      <div className="card-container">
        {cards.map((card, index) => (
          <Link to={card.link} className="card-link" key={index}>
            <div className="card">
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
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Menu;
