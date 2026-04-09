const express = require('express');
const requestLogger = require('./middleware/requestLogger');
const requestPreprocessor = require('./middleware/requestPreprocessor');
const demoRoutes = require('./routes/demoRoutes');

const app = express();

// Global middleware (application-level middleware).
app.use(requestLogger);
app.use(requestPreprocessor);

app.get('/', (req, res) => {
  console.log('[Route Handler] / reached.');
  res.send('LAB-12 Exercise 2 middleware demo is running.');
});

app.use('/api/demo', demoRoutes);

module.exports = app;
