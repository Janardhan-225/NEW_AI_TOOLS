const AITool = require('../models/aitoolsModel');

exports.getToolsByCost = async (req, res) => {
  try {
    // Group tools by cost using MongoDB aggregation
    const costGroups = await AITool.aggregate([
      {
        $group: {
          _id: "$cost", // Group by the cost field
          count: { $sum: 1 }, // Count tools in each group
          tools: {
            $push: {
              name: "$name",
              description: "$description",
              websiteUrl: "$websiteUrl",
              category: "$category",
              aitoolImage: "$aitoolImage"
            }
          }
        }
      },
      { $sort: { _id: 1 } } // Sort by cost type (alphabetical order)
    ]);

    // Send response
    res.status(200).json({
      status: 'success',
      results: costGroups.length,
      data: {
        costGroups
      }
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: err.message
    });
  }
};