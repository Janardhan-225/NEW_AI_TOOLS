const express = require('express');
const router = express.Router();
const Rating = require('../models/rating');
const AITool = require('../models/aitoolsModel');

// Add or update a rating
router.post('/', async (req, res, next) => {
  const { toolId, userId, rating } = req.body;

  try {
    // Check if the user has already rated this tool
    const existingRating = await Rating.findOne({ toolId, userId });

    if (existingRating) {
      // Update existing rating
      existingRating.rating = rating;
      await existingRating.save();
    } else {
      // Create new rating
      await Rating.create({ toolId, userId, rating });
    }

    // Recalculate average rating
    const ratings = await Rating.find({ toolId });
    const totalRating = ratings.reduce((sum, r) => sum + r.rating, 0);
    const averageRating = totalRating / ratings.length;

    // Update AI Tool document with the new average rating and rating count
    await AITool.findByIdAndUpdate(toolId, {
      averageRating,
      ratingCount: ratings.length
    });

    res.status(200).json({ success: true, averageRating });
  } catch (error) {
    next(error); // Call the next middleware (error handler)
  }
});

// Export the router
module.exports = router;
