import { useState } from 'react';
import './ReviewPage.css'; // Ensure this file exists

function ReviewPage() {
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(1); // Optional: If you want to include a rating system
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5002/reviews', { // Adjust the URL to your backend endpoint
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ review, rating }), // Include rating if applicable
      });

      if (response.ok) {
        setMessage('Review submitted successfully!');
        setReview(''); // Clear the input after submission
        setRating(1); // Reset rating if used
      } else {
        setMessage('Failed to submit review.');
      }
    } catch (error) {
      setMessage('Error: ' + error.message);
    }
  };

  return (
    <div className="review-page">
      <h2>Submit a Review</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="review">Your Review:</label>
          <textarea
            id="review"
            rows="5"
            value={review}
            onChange={(e) => setReview(e.target.value)}
            required
          ></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="rating">Rating:</label>
          <select
            id="rating"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          >
            <option value="1">1 Star</option>
            <option value="2">2 Stars</option>
            <option value="3">3 Stars</option>
            <option value="4">4 Stars</option>
            <option value="5">5 Stars</option>
          </select>
        </div>

        <button type="submit" className="btn">Submit Review</button>
        {message && <p className="success-message">{message}</p>}
      </form>
    </div>
  );
}

export default ReviewPage;
