const express = require('express');
const productsRouter = require('./routes/productsRoutes');

const app = express();

// Parse incoming JSON request bodies.
app.use(express.json());

app.get('/', (req, res) => {
  res.send('LAB-12 Exercise 1 REST API is running.');
});

app.use('/api/products', productsRouter);

app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && 'body' in err) {
    return res.status(400).json({ success: false, message: 'Invalid JSON payload' });
  }

  return next(err);
});

module.exports = app;
