import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './MenuDetail.css';
const CardDetail = () => {
  const { cardId } = useParams();  // Get cardId from route params
  const [card, setCard] = useState(null);

  useEffect(() => {
    const fetchCardDetail = async () => {
      try {
        // Fetch the specific card using the cardId
        const response = await fetch(`http://localhost:5002/cards/${cardId}`);
        if (response.ok) {
          const data = await response.json();
          setCard(data);  // Set the fetched card data
        } else {
          console.error('Failed to fetch card details');
        }
      } catch (error) {
        console.error('Error fetching card details:', error);
      }
    };

    fetchCardDetail();
  }, [cardId]);

  if (!card) {
    return <div>Loading card details...</div>;
  }

  return (
    <div className="card-detail">
      <h1>{card.name}</h1>
      <img src={card.images[0].url} alt={card.title} />
      <p>{card.text}</p>
      <div>Price: {card.price}</div>
      <div>Rating: {card.ratings.averageRating}★</div>
    </div>
  );
};

export default CardDetail;
