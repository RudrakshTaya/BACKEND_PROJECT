import React from 'react';
import './Menu.css';
import { Link } from 'react-router-dom';
import { allCards } from './cards';
import './cards.css';


function Menu() {
  return (
    <div className='menu-page'>
      <header className='height-50 mt-5'>
        <div className='container h-100 d-flex align-items-center justify-content-center'>
          <h1 className='text-light'>Menu</h1>
        </div>
      </header>
      <div className="card-container">
          {allCards.map((card, index) => (
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
                <div className="card-rating">{card.rating}*</div>
                </div>
                </div>
                

              </div>
            </Link>
          ))}
        </div>

    

      

    </div>

  )
}

export default Menu;