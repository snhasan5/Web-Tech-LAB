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
mongoose.connect('mongodb://localhost:27017/student_notes_db', {
  // Use new URL parser and unified topology (no longer needed in Mongoose 6+, but good to be explicit for older versions)
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// Note Schema
const noteSchema = new mongoose.Schema({
  title: String,
  subject: String,
  description: String,
  created_date: { type: Date, default: Date.now }
});

const Note = mongoose.model('Note', noteSchema);

// API Routes

// 1. Add Note
app.post('/notes', async (req, res) => {
  try {
    const { title, subject, description } = req.body;
    const newNote = new Note({
      title,
      subject,
      description
      // created_date defaults to now
    });
    const savedNote = await newNote.save();
    res.status(201).json(savedNote);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 2. View Notes (All)
app.get('/notes', async (req, res) => {
  try {
    const notes = await Note.find().sort({ created_date: -1 }); // Sort by newest first
    res.json(notes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 3. Edit Note / Update Note
app.put('/notes/:id', async (req, res) => {
  try {
    const { title, subject, description } = req.body;
    // Use partial update to allow updating specific fields
    const updateData = {};
    if (title !== undefined) updateData.title = title;
    if (subject !== undefined) updateData.subject = subject;
    if (description !== undefined) updateData.description = description;

    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      updateData, // Use the constructed object for $set behavior
      { new: true } // Return the updated document
    );
    if (!updatedNote) return res.status(404).json({ error: 'Note not found' });
    res.json(updatedNote);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 4. Delete Note
app.delete('/notes/:id', async (req, res) => {
  try {
    const result = await Note.findByIdAndDelete(req.params.id);
    if (!result) return res.status(404).json({ error: 'Note not found' });
    res.json({ message: 'Note deleted successfully' });
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
