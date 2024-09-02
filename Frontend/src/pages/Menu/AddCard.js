import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddCard.css';
function AddCard() {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [imgSrc, setImgSrc] = useState('');
  const [link, setLink] = useState('');
  const [price, setPrice] = useState('');
  const [rating, setRating] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5002/cards', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, text, imgSrc, link, price, rating }),
      });
      if (response.ok) {
        navigate('/menu');
      } else {
        alert('Failed to add card');
      }
    } catch (error) {
      console.error('Error adding card:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" required />
      <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Description" required />
      <input type="text" value={imgSrc} onChange={(e) => setImgSrc(e.target.value)} placeholder="Image URL" required />
      <input type="text" value={link} onChange={(e) => setLink(e.target.value)} placeholder="Link" required />
      <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Price" required />
      <input type="text" value={rating} onChange={(e) => setRating(e.target.value)} placeholder="Rating" required />
      <button type="submit">Add Card</button>
    </form>
  );
}

export default AddCard;
