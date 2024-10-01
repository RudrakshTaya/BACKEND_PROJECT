import { useState, useEffect } from 'react';
import './ReviewPage.css'; // Ensure this file exists

function ReviewPage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [rating, setRating] = useState(1);
  const [message, setMessage] = useState('');
  const [reviews, setReviews] = useState([]); // State to hold all reviews

  // Fetch reviews when the component loads
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch('http://localhost:5002/api/reviews');
        const data = await response.json();
        setReviews(data); // Store fetched reviews in state
      } catch (error) {
        console.error('Failed to fetch reviews:', error);
      }
    };

    fetchReviews();
  }, []); // Empty dependency array means this runs once when the component mounts

  // Handle form submission to post a new review
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5002/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, content, rating }),
      });

      if (response.ok) {
        setMessage('Review submitted successfully!');
        setTitle('');
        setContent('');
        setRating(1);

        // Refetch reviews after a successful submission
        const newReview = await response.json();
        setReviews([...reviews, newReview]); // Add the new review to the list
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
          <label htmlFor="title">Title:</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="content">Your Review:</label>
          <textarea
            id="content"
            rows="5"
            value={content}
            onChange={(e) => setContent(e.target.value)}
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

      <h2>All Reviews</h2>
      <div className="reviews-list">
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div key={review._id} className="review-card">
              <h3>{review.title}</h3>
              <p>{review.content}</p>
              <p>Rating: {review.rating} Stars</p>
              <p>Submitted on: {new Date(review.createdAt).toLocaleDateString()}</p>
            </div>
          ))
        ) : (
          <p>No reviews yet.</p>
        )}
      </div>
    </div>
  );
}

export default ReviewPage;
