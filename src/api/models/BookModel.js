const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  author: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: false,
    trim: true
  },
  condition: {
    type: String,
    required: true,
    enum: ['Nuevo', 'Como nuevo', 'Usado', 'Dañado'],
  },
  imageUrl: {
    type: String,
    required: false 
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Book = mongoose.model('Book', bookSchema);
module.exports = Book;
