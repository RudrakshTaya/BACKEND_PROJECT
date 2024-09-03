import React, { useState } from 'react';
import './AddCard.css';
function AddCard() {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [imgSrc, setImgSrc] = useState('');
  const [link, setLink] = useState('');
  const [price, setPrice] = useState('');
  const [rating, setRating] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5002/cards', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, text, imgSrc, link, price, rating }),
      });
      if (response.ok) {
        // Handle successful addition
        alert('Card added successfully');
      } else {
        alert('Failed to add card');
      }
    } catch (error) {
      console.error('Error adding card:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="add-card-form">
      <h2>Add Card</h2>
      <div className="form-group">
        <label>Title</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
      </div>
      <div className="form-group">
        <label>Text</label>
        <textarea value={text} onChange={(e) => setText(e.target.value)} required />
      </div>
      <div className="form-group">
        <label>Image URL</label>
        <input type="text" value={imgSrc} onChange={(e) => setImgSrc(e.target.value)} required />
      </div>
      <div className="form-group">
        <label>Link</label>
        <input type="text" value={link} onChange={(e) => setLink(e.target.value)} required />
      </div>
      <div className="form-group">
        <label>Price</label>
        <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />
      </div>
      <div className="form-group">
        <label>Rating</label>
        <input type="number" value={rating} onChange={(e) => setRating(e.target.value)} required />
      </div>
      <button type="submit">Add Card</button>
    </form>
  );
}

export default AddCard;
