import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './UpdateCard.css';

function UpdateCard() {
  const { id } = useParams();
  const [card, setCard] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCard = async () => {
      try {
        const response = await fetch(`http://localhost:5002/cards/${id}`);
        if (response.ok) {
          const data = await response.json();
          setCard(data);
        } else {
          console.error('Failed to fetch card');
        }
      } catch (error) {
        console.error('Error fetching card:', error);
      }
    };

    fetchCard();
  }, [id]);

  const handleChange = (e) => {
    setCard({ ...card, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5002/cards/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(card),
      });
      if (response.ok) {
        navigate('/menu');
      } else {
        alert('Failed to update card');
      }
    } catch (error) {
      console.error('Error updating card:', error);
    }
  };

  if (!card) return <div>Loading...</div>;

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="title" value={card.title} onChange={handleChange} placeholder="Title" required />
      <textarea name="text" value={card.text} onChange={handleChange} placeholder="Description" required />
      <input type="text" name="imgSrc" value={card.imgSrc} onChange={handleChange} placeholder="Image URL" required />
      <input type="text" name="link" value={card.link} onChange={handleChange} placeholder="Link" required />
      <input type="text" name="price" value={card.price} onChange={handleChange} placeholder="Price" required />
      <input type="text" name="rating" value={card.rating} onChange={handleChange} placeholder="Rating" required />
      <button type="submit">Update Card</button>
    </form>
  );
}

export default UpdateCard;
