import AITool from '@/models/AITool';

export default async function handler(req, res) {
  try {
    const toolsByCategory = await AITool.aggregate([
      {
        $group: {
          _id: "$category",
          tools: { $push: "$$ROOT" }
        }
      },
      {
        $project: {
          category: "$_id",
          tools: 1,
          _id: 0
        }
      }
    ]);

    // Convert array to object with category names as keys
    const categoriesObject = toolsByCategory.reduce((acc, curr) => {
      acc[curr.category] = curr.tools;
      return acc;
    }, {});

    res.status(200).json(categoriesObject);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch tools by category' });
  }
}