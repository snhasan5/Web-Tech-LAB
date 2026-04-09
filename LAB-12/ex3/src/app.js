const express = require('express');
const userRoutes = require('./routes/userRoutes');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('LAB-12 Exercise 3 MongoDB CRUD API is running.');
});

app.use('/api/users', userRoutes);

module.exports = app;
