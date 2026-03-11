const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/online_book_finder_db', {
  // Use new URL parser and unified topology (no longer needed in Mongoose 6+, but good to be explicit for older versions)
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// Book Schema
const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  category: String,
  price: Number,
  rating: Number,
  year: Number
});

const Book = mongoose.model('Book', bookSchema);

// Helper function for seeding
app.post('/api/seed', async (req, res) => {
  try {
    await Book.deleteMany({});
    const books = [
      { title: "JavaScript Essentials", author: "John Smith", category: "Programming", price: 450, rating: 4.5, year: 2023 },
      { title: "HTML & CSS Design", author: "Jane Doe", category: "Web Design", price: 300, rating: 4.2, year: 2022 },
      { title: "React for Beginners", author: "Bob Martin", category: "Programming", price: 500, rating: 4.8, year: 2024 },
      { title: "The Art of War", author: "Sun Tzu", category: "Strategy", price: 150, rating: 4.9, year: 2020 },
      { title: "Node.js in Action", author: "Mike Cantelon", category: "Programming", price: 550, rating: 4.6, year: 2023 },
      { title: "Python Crash Course", author: "Eric Matthes", category: "Programming", price: 600, rating: 4.7, year: 2023 },
      { title: "Clean Code", author: "Robert C. Martin", category: "Programming", price: 700, rating: 4.9, year: 2008 },
      { title: "Design Patterns", author: "Erich Gamma", category: "Programming", price: 650, rating: 4.8, year: 1994 },
      { title: "Introduction to Algorithms", author: "Thomas H. Cormen", category: "Computer Science", price: 1200, rating: 4.6, year: 2009 },
      { title: "Data Structures and Algorithms", author: "Narasimha Karumanchi", category: "Computer Science", price: 800, rating: 4.4, year: 2016 },
      { title: "Head First Java", author: "Kathy Sierra", category: "Programming", price: 580, rating: 4.5, year: 2005 },
      { title: "Eloquent JavaScript", author: "Marijn Haverbeke", category: "Programming", price: 400, rating: 4.3, year: 2018 }
    ];
    await Book.insertMany(books);
    res.json({ message: "Database seeded successfully!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// API Routes

// 1. Search Books by Title
app.get('/api/books/search', async (req, res) => {
  try {
    const title = req.query.title;
    if (!title) return res.status(400).json({ error: "Title query parameter required" });
    const books = await Book.find({ title: { $regex: title, $options: "i" } });
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 2. Filter Books by Category
app.get('/api/books/category/:category', async (req, res) => {
  try {
    const category = req.params.category;
    // Case-insensitive category search for better UX
    const books = await Book.find({ category: { $regex: new RegExp(`^${category}$`, 'i') } });
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 3. Sort Books
// Sort by price (ascending)
app.get('/api/books/sort/price', async (req, res) => {
  try {
    const books = await Book.find().sort({ price: 1 });
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Sort by rating (descending)
app.get('/api/books/sort/rating', async (req, res) => {
  try {
    const books = await Book.find().sort({ rating: -1 });
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 4. Top Rated Books
app.get('/api/books/top', async (req, res) => {
  try {
    // Rating greater than or equal to 4, limit 5
    const books = await Book.find({ rating: { $gte: 4 } }).limit(5);
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 5. Pagination (Load More) and Default List
app.get('/api/books', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 5;
    const skip = (page - 1) * limit;
    
    const books = await Book.find().skip(skip).limit(limit);
    const total = await Book.countDocuments();
    
    res.json({
      books,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalBooks: total
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Serve frontend
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
