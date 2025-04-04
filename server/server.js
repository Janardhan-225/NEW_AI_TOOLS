const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cron = require('node-cron');
const fetchNewAITools = require('./utils/fetchExistingAITools');
const aitoolsApi = require('./routes/aitoolsApi'); // Ensure this is correctly included
require('dotenv').config();
const cors = require('cors');

app.use(cors({
  origin: ["http://localhost:5173", "https://ai-tools-front.onrender.com"],// Allow only your frontend origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
  credentials: true // Allow cookies and credentials
}));
;


app.use(express.json());

// Connect to the database
mongoose.connect(process.env.MONGODB_URL)
  .then(() => {
    console.log('Database connected successfully');
    app.listen(process.env.PORT, () => {
      console.log(`Server started at http://localhost:${process.env.PORT}`);
    });
  })
  .catch(err => {
    console.error('Database connection error:', err);
  });

// Route for your AI tools API
app.use('/api', aitoolsApi);

// Cron job to fetch new AI tools every hour
cron.schedule('* * * * *', async () => {
  console.log('Fetching new AI tools...');
  await fetchNewAITools();
  console.log('Fetching complete.');
});

// Error-handling middleware to catch and handle any errors that occur during request processing
app.use((err, req, res, next) => {
  console.error(err.stack);  // Optional: log the error stack for debugging
  res.status(500).send({ message: err.message || 'An unknown error occurred.' });
  next(err);
});
