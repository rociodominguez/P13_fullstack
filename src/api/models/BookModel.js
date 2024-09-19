const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  category: { type: String },
  year: { type: Number },
  pages: { type: Number },
  status: { type: String, enum: ['want to read', 'currently reading', 'read'], required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

module.exports = mongoose.model('Book', BookSchema);
