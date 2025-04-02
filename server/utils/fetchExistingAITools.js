const puppeteer = require('puppeteer');
const fs = require('fs');
const AITool = require('../models/aitoolsModel');

const getBrowserPath = () => {
  // 1. Try environment variables first
  if (process.env.PUPPETEER_EXECUTABLE_PATH && fs.existsSync(process.env.PUPPETEER_EXECUTABLE_PATH)) {
    return process.env.PUPPETEER_EXECUTABLE_PATH;
  }

  // 2. Try Puppeteer's bundled Chromium
  try {
    const puppeteerPath = puppeteer.executablePath();
    if (fs.existsSync(puppeteerPath)) return puppeteerPath;
  } catch (error) {
    console.warn('Puppeteer bundled Chromium not found');
  }

  // 3. Platform-specific fallbacks
  const platformPaths = {
    win32: [
      process.env.CHROME_PATH,
      'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
      'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe'
    ],
    linux: [
      '/usr/bin/chromium-browser',
      '/usr/bin/chromium',
      '/snap/bin/chromium'
    ],
    darwin: [
      '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
    ]
  };

  const paths = platformPaths[process.platform] || [];
  for (const path of paths) {
    if (fs.existsSync(path)) return path;
  }

  throw new Error(`
    Browser not found! Solutions:
    1. Install Chrome: https://www.google.com/chrome/
    2. Set PUPPETEER_EXECUTABLE_PATH to your Chrome path
    3. Run: npm uninstall puppeteer && npm install puppeteer
  `);
};

const fetchExistingAITools = async () => {
  try {
    const browser = await puppeteer.launch({
      headless: 'new',
      executablePath: getBrowserPath(), // Use the verification function
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

    // Get list of tool names from scraped data
    const toolNames = tools.map(tool => tool.name);

    // Fetch all existing tools at once
    const existingTools = await AITool.find({ name: { $in: toolNames } });
    const existingToolNames = new Set(existingTools.map(tool => tool.name));

    // Filter out tools that already exist
    const toolsToSave = tools.filter(tool => !existingToolNames.has(tool.name));

    if (toolsToSave.length > 0) {
      await AITool.insertMany(toolsToSave);
      console.log('Saved new tools:', toolsToSave.map(tool => tool.name));
    } else {
      console.log('No new tools to save.');
    }

  } catch (error) {
    console.error('An error occurred:', error);
  }
};

module.exports = fetchExistingAITools;
