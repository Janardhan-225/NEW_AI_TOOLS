// routes/comments.js
const express = require('express');
const router = express.Router();
const Comment = require('../models/comment');
const AITool = require('../models/aitoolsModel');

// Add a comment
router.post('/', async (req, res) => {
  const { toolId, userId, text } = req.body;

  try {
    const newComment = await Comment.create({ toolId, userId, text });

    // Increment comment count in AI Tool document
    await AITool.findByIdAndUpdate(toolId, {
      $inc: { commentCount: 1 }
    });

    res.status(201).json({ success: true, comment: newComment });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get comments for a tool
router.get('/:toolId', async (req, res) => {
  try {
    const comments = await Comment.find({ toolId })
      .populate('userId', 'username') // Populate user details (if you have user authentication)
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, comments });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});
module.exports = router;    