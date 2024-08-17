import React, { useState } from 'react';
import './GiveReviews.css';

function GiveReviews({ onSubmit }) {
  const [formData, setFormData] = useState({
    name: '',
    review: '',
    rating: 0
  });
  const [showWarning, setShowWarning] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRatingChange = (rating) => {
    setFormData({ ...formData, rating });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.name && formData.review && formData.rating) {
      setShowWarning(false);
      onSubmit({ reviewText: formData.review, rating: formData.rating });
      setFormData({ name: '', review: '', rating: 0 });
    } else {
      setShowWarning(true);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Give Your Feedback</h2>
      {showWarning && <p className="warning">Please fill out all fields.</p>}
      <div>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="review">Review:</label>
        <textarea id="review" name="review" value={formData.review} onChange={handleChange} />
      </div>
      <div className="rating">
        <label>Rating:</label>
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={`star ${formData.rating >= star ? 'filled' : ''}`}
            onClick={() => handleRatingChange(star)}
          >
            ★
          </span>
        ))}
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}

export default GiveReviews;
