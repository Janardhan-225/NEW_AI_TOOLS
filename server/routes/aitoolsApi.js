const express = require('express');
const router = express.Router();
const AITool = require('../models/aitoolsModel'); // Import your Mongoose model
const aitoolsController = require('../utils/controller');

router.get('/aitools-by-cost', aitoolsController.getToolsByCost);
  
  
// Route to fetch and display existing AI tools
router.get('/display-aitools', async (req, res) => {
  try {
    // Fetch tools from database with proper error handling
    const tools = await AITool.find()
      .sort({ createdAt: -1 }) // Sort by newest first
      .lean()
      .exec();

    // Handle empty database case
    if (!tools || tools.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No AI tools found in database'
      });
    }

    // Proper JSON response
    res.status(200).json({
      success: true,
      count: tools.length,
      data: tools
    });
    
  } catch (error) {
    console.error('Database error:', error);
    // Ensure proper JSON error response
    res.status(500).json({
      success: false,
      error: 'Database Error',
      message: error.message
    });
  }
});

// Example of another endpoint for retrieving a single tool
router.get('/tool/:id', async (req, res) => {
  try {
    const tool = await AITool.findById(req.params.id);
    if (!tool) {
      return res.status(404).json({
        success: false,
        message: 'Tool not found'
      });
    }
    res.status(200).json({
      success: true,
      data: tool
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Database Error',
      error: error.message
    });
  }
});
router.get('/tools/:id', async (req, res) => {
  const toolId = req.params.id;

  try {
    const ratings = await Rating.find({ toolId });
    const totalRating = ratings.reduce((sum, r) => sum + r.rating, 0);
    const averageRating = ratings.length > 0 ? totalRating / ratings.length : 0;

    res.json({ success: true, tool: { ...toolDetails, rating: averageRating } });
  } catch (error) {
    console.error('Error fetching tool:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch tool' });
  }
});

module.exports = router;
