import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RatingSection = ({ toolId, initialRating }) => {
  const [rating, setRating] = useState(initialRating || 0); // Average rating
  const [hoverRating, setHoverRating] = useState(0); // For hover effect
  const [userRating, setUserRating] = useState(0); // User's current rating
  const [loading, setLoading] = useState(false); // Loading state

  // Fetch the user's rating when the component mounts
  useEffect(() => {
    const fetchUserRating = async () => {
      try {
        const response = await axios.get(`/api/rating/${toolId}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setUserRating(response.data.userRating || 0);
      } catch (error) {
        console.error('Error fetching user rating:', error);
      }
    };

    fetchUserRating();
  }, [toolId]);

  // Handle when a user clicks on a star
  const handleRating = async (newRating) => {
    if (loading) return; // Prevent multiple submissions
    setLoading(true);

    try {
      // Send the new rating to the backend
      const response = await axios.post(
        '/api/rate',
        { toolId, rating: newRating },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );

      // Update the displayed rating and user's rating
      setRating(response.data.averageRating);
      setUserRating(newRating);
    } catch (error) {
      console.error('Error submitting rating:', error);
      alert('Failed to submit rating. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Render the 5-star rating UI
  const renderRatingStars = () => {
    return [1, 2, 3, 4, 5].map((star) => (
      <span
        key={star}
        className={`star ${star <= (hoverRating || userRating) ? 'filled' : ''}`}
        onClick={() => handleRating(star)}
        onMouseEnter={() => setHoverRating(star)}
        onMouseLeave={() => setHoverRating(0)}
        style={{ cursor: loading ? 'not-allowed' : 'pointer' }} // Disable clicks when loading
      >
        ★
      </span>
    ));
  };

  return (
    <div className="rating-section">
      <div className="d-flex">{renderRatingStars()}</div>
      <span className="rating-value">{rating.toFixed(1)}</span>
      {loading && <span className="loading-text">Saving...</span>}
    </div>
  );
};

export default RatingSection;