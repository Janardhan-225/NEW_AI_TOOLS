const puppeteer = require('puppeteer');
const AITool = require('../models/aitoolsModel'); 
const fetchExistingAITools = async () => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://www.futurepedia.io/', { waitUntil: 'domcontentloaded' });

    // Wait for the tools section to load
    await page.waitForSelector('.flex.flex-col.bg-card.text-card-foreground');

    // Extract the data
    const tools = await page.evaluate(() => {
      const toolsArray = [];
      
      document.querySelectorAll('.flex.flex-col.bg-card.text-card-foreground').forEach(element => {
        const name = element.querySelector('p.text-xl.font-semibold.text-slate-700')?.textContent.trim();
        const websiteUrl = `${element.querySelector('a')?.getAttribute('href')}`;
        const aitoolImage = element.querySelector('img')?.getAttribute('src');

        // Extract categories from <a> tags inside the category div
        const categoryLinks = element.querySelectorAll('.px-6.mb-6.flex.flex-wrap.gap-1.py-2.text-base.text-ice-500 a');
        const categories = Array.from(categoryLinks).map(link => link.textContent.trim()).join(', ') || 'Category not available';

        // Extract the cost (e.g., "Free Trial")
        const cost = element.querySelector('.flex.justify-between.text-lg span')?.textContent.trim() || 'Cost not available';

        // Extract description (if available)
        const description = element.querySelector('p.text-muted-foreground')?.textContent.trim() || 'Description not available';

        // Extract the rating (based on the stars)
        const rating = element.querySelectorAll('.text-yellow-500 h-4').length || 'No rating';

        // Create the object to push into the array
        toolsArray.push({
          name,
          websiteUrl,
          aitoolImage,
          category: categories,
          cost,
          description,
          rating
        });
      });

      return toolsArray;
    });
    await browser.close();

    // Save the data to MongoDB
    for (const tool of tools) {
      const existingTool = await AITool.findOne({ name: tool.name });
      
      if (!existingTool) {
        // Save new tools to the database
        const newTool = new AITool(tool);
        await newTool.save();
        console.log('Saved new tool:', tool.name);
      } else {
        console.log('Tool already exists in the database:', tool.name);
      }
    }
  }
  
  catch (error) {
    console.error('An error occurred:', error);
  }
};
module.exports = fetchExistingAITools;
