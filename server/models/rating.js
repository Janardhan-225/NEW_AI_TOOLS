// models/Rating.js
const mongoose = require('mongoose');

const RatingSchema = new mongoose.Schema({
  toolId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'AITool', // Reference to the AI tool
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the user (if you have user authentication)
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1, // Minimum rating value
    max: 5  // Maximum rating value
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Ensure a user can only rate a tool once
RatingSchema.index({ toolId: 1, userId: 1 }, { unique: true });

module.exports = mongoose.model('Rating', RatingSchema);