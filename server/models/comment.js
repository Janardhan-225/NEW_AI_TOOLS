// models/Comment.js
const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
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
  text: {
    type: String,
    required: true,
    maxlength: 500 // Limit comment length
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Comment', CommentSchema);