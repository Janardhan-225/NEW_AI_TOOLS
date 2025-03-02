const fetchExistingAITools = require('./fetchExistingAITools');

// Function to run the task every 24 hours (86,400,000 ms)
function runEveryDay() {
  fetchExistingAITools(); // Call your scraping function
  console.log('Script has run');
}

// Run the script immediately
runEveryDay();

// Run the script every 24 hours
setInterval(runEveryDay, 86400000);
