const AIToolModel = require('../models/aitoolModel');
const fetchExistingAITools = require('./fetchExistingAITools');

const saveAIToolsToDB = async () => {
  const tools = await fetchExistingAITools();

  for (const tool of tools) {
    const exists = await AIToolModel.findOne({ name: tool.name });
    if (!exists) {
      tool.createdAt = new Date();
      await AIToolModel.create(tool);
      console.log('Saved tool:', tool.name); // Debugging log
    }
  }

  console.log('AI tools saved to DB');
};

module.exports = saveAIToolsToDB;