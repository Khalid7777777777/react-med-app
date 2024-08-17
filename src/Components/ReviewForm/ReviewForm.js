import React, { useState } from 'react';
import GiveReviews from '../GiveReviews/GiveReviews';
import './ReviewForm.css';

const ReviewForm = ({ reviews }) => {
  const [selectedReviewIndex, setSelectedReviewIndex] = useState(null);
  const [reviewList, setReviewList] = useState(reviews);
  const [submittedReviews, setSubmittedReviews] = useState(new Set());

  const handleFeedback = (index) => {
    setSelectedReviewIndex(index);
  };

  // Function to update the review after submission
  const handleReviewSubmit = (index, reviewData) => {
    const updatedReviews = reviewList.map((review, i) =>
      i === index ? { ...review, reviewGiven: reviewData.reviewText, rating: reviewData.rating } : review
    );
    setReviewList(updatedReviews);
    setSubmittedReviews(prev => new Set(prev).add(index)); // Mark review as submitted
    setSelectedReviewIndex(null); // Optionally, close the form after submission
  };

  return (
    <div>
      <h2>Reviews</h2>
      <table>
        <thead>
          <tr>
            <th>Serial Number</th>
            <th>Doctor Name</th>
            <th>Doctor Specialty</th>
            <th>Provide Feedback</th>
            <th>Review Given</th>
            <th>Rating</th>
          </tr>
        </thead>
        <tbody>
          {reviewList.map((review, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{review.doctorName}</td>
              <td>{review.specialty}</td>
              <td>
                {submittedReviews.has(index) ? (
                  <span>Feedback Submitted</span>
                ) : selectedReviewIndex === index ? (
                  <GiveReviews
                    onSubmit={(reviewData) => handleReviewSubmit(index, reviewData)}
                  />
                ) : (
                  <button onClick={() => handleFeedback(index)}>Click Here</button>
                )}
              </td>
              <td>{review.reviewGiven ? review.reviewGiven : 'No'}</td>
              <td>{review.rating ? `${review.rating} ★` : 'No rating'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReviewForm;
