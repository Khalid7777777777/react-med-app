import React from 'react';
import './ReviewForm.css'; // Optional: Create a CSS file for styling

const ReviewForm = ({ reviews }) => {
  const handleFeedback = (review) => {
    // Handle feedback logic here, like redirecting to a feedback form page
    alert(`Provide feedback for Dr. ${review.doctorName}`);
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
          </tr>
        </thead>
        <tbody>
          {reviews.map((review, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{review.doctorName}</td>
              <td>{review.specialty}</td>
              <td>
                <button onClick={() => handleFeedback(review)}>Click Here</button>
              </td>
              <td>{review.reviewGiven ? 'Yes' : 'No'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReviewForm;
