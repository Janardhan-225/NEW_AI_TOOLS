const puppeteer = require('puppeteer');
const fs = require('fs');
const AITool = require('../models/aitoolsModel'); 
const getChromiumPath = () => {
  // Common paths for free tier deployments
  const possiblePaths = [
    process.env.CHROME_PATH,
    'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',             // Custom installations
    process.env.PUPPETEER_EXECUTABLE_PATH,
    puppeteer.executablePath() // Last fallback to Puppeteer's bundled Chromium
  ].filter(Boolean);

  for (const path of possiblePaths) {
    try {
      if (fs.existsSync(path)) {
        console.log('Using browser at:', path);
        return path;
      }
    } catch (err) {
      console.warn('Path check failed for:', path);
    }
  }
  throw new Error(`Browser not found! Tried:\n${possiblePaths.join('\n')}`);
};
const fetchExistingAITools = async () => {
  
  
  try {
    const browser = await puppeteer.launch({
      headless: 'new',
      executablePath: getChromiumPath(),  // Use the verification function
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage'
      ]
    });

    const page = await browser.newPage();
    await page.goto('https://www.futurepedia.io/', { waitUntil: 'domcontentloaded' });

    // Wait for the tools section to load
    await page.waitForSelector('.flex.flex-col.bg-card.text-card-foreground', { timeout: 10000 });

    // Extract the data
    const tools = await page.evaluate(() => {
      const toolsArray = [];
      document.querySelectorAll('.flex.flex-col.bg-card.text-card-foreground').forEach(element => {
        const name = element.querySelector('p.text-xl.font-semibold.text-slate-700')?.textContent.trim();
        const websiteUrl = element.querySelector('a')?.getAttribute('href') || 'No URL';
        const aitoolImage = element.querySelector('img')?.getAttribute('src') || 'No Image';
        const categoryLinks = element.querySelectorAll('.px-6.mb-6.flex.flex-wrap.gap-1.py-2.text-base.text-ice-500 a');
        const categories = Array.from(categoryLinks).map(link => link.textContent.trim()).join(', ') || 'Category not available';
        const cost = element.querySelector('.flex.justify-between.text-lg span')?.textContent.trim() || 'Cost not available';
        const description = element.querySelector('p.text-muted-foreground')?.textContent.trim() || 'Description not available';
        const rating = element.querySelectorAll('.text-yellow-500 h-4').length || 'No rating';

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

    // Save new tools to MongoDB
    const toolsToSave = [];
    for (const tool of tools) {
      const existingTool = await AITool.findOne({ name: tool.name });
      if (!existingTool) {
        toolsToSave.push(tool);
      } else {
        console.log('Tool already exists in the database:', tool.name);
      }
    }

    if (toolsToSave.length > 0) {
      await AITool.insertMany(toolsToSave);
      console.log('Saved new tools:', toolsToSave.map(tool => tool.name));
    }

  } catch (error) {
    console.error('An error occurred:', error);
  }
};

module.exports = fetchExistingAITools;
