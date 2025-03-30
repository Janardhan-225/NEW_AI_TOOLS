import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FaExternalLinkAlt, FaStar, FaTag, FaMoneyBillWave, FaClock, FaAngleDown } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './css/AiToolCard.css';

const AiToolCard = ({ tool }) => {
  const renderRatingStars = () => {
    return Array.from({ length: 5 }, (_, index) => (
      <FaStar
        key={index}
        className={`star-icon ${index < tool.rating ? 'filled' : ''}`}
      />
    ));
  };

  const handleCardClick = (event) => {
    const isLink = event.target.closest('.clickable-link');
    if (!isLink) {
      event.preventDefault();
      event.stopPropagation();
    }
  };

  return (
    <div className="aitool-card-container" onClick={handleCardClick}>
      <div className="card-content">
        <div className="non-clickable">
          <div className="card-img-top card1">
            <img 
              className="aitool-image" 
              src={tool.aitoolImage} 
              alt={tool.name} 
            />
      </div>
          <h3 className="aitool-name">{tool.name}</h3>
          
          <div className="category-column">
            <FaTag className="category-icon" />
            <span className="category-text">{tool.category}</span>
        </div>

          <div className="d-flex justify-content-between">
            <div className="detail-item">
              <FaMoneyBillWave className="detail-icon" />
              <span>{tool.cost}</span>
            </div>
            <div className="detail-item">
              <FaClock className="detail-icon" />
              <span>{new Date(tool.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
          <div className="d-flex justify-content-between m-2">
            <div className="rating-section">
              <div className="d-flex">{renderRatingStars()}</div>
              <span className="rating-value">{tool.rating}</span>
            </div>
          </div>
        </div>
        <a 
          href={tool.websiteUrl} 
          className="visit-website-btn" 
          target="_blank" 
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
        >
          Visit Website
          <FaExternalLinkAlt className="link-icon" />
        </a>
      </div>
    </div>
  );
};

AiToolCard.propTypes = {
  tool: PropTypes.shape({
    aitoolImage: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    cost: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    createdAt: PropTypes.string.isRequired,
    websiteUrl: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
  }).isRequired,
};

export default AiToolCard;
