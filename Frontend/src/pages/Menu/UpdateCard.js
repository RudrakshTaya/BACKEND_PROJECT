import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './UpdateCard.css';

function UpdateCard() {
  const { cardId } = useParams();
  const [card, setCard] = useState(null);
  const [error, setError] = useState(null); // State for handling errors
  const [success, setSuccess] = useState(null); // State for handling success messages

  useEffect(() => {
    const fetchCard = async () => {
      try {
        const response = await fetch(`http://localhost:5002/cards`);
        if (response.ok) {
          const data = await response.json();
          setCard(data);
        } else {
          console.error('Failed to fetch card');
          setError('Failed to fetch card');
        }
      } catch (error) {
        console.error('Error fetching card:', error);
        setError('Error fetching card');
      }
    };

    fetchCard();
  }, [cardId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5002/cards/${cardId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(card),
      });
      if (response.ok) {
        setSuccess('Card updated successfully');
      } else {
        console.error('Failed to update card');
        setError('Failed to update card');
      }
    } catch (error) {
      console.error('Error updating card:', error);
      setError('Error updating card');
    }
  };

  const handleChange = (e) => {
    setCard({ ...card, [e.target.name]: e.target.value });
  };

  return card ? (
    <form onSubmit={handleSubmit} className="update-card-form">
      <h2>Update Card</h2>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}
      <div className="form-group">
        <label>Title</label>
        <input type="text" name="title" value={card.title} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label>Text</label>
        <textarea name="text" value={card.text} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label>Image URL</label>
        <input type="text" name="imgSrc" value={card.imgSrc} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label>Link</label>
        <input type="text" name="link" value={card.link} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label>Price</label>
        <input type="number" name="price" value={card.price} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label>Rating</label>
        <input type="number" name="rating" value={card.rating} onChange={handleChange} required />
      </div>
      <button type="submit">Update Card</button>
    </form>
  ) : (
    <p>Loading card details...</p>
  );
}

export default UpdateCard;
