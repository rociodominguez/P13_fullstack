const Book = require('../models/BookModel');


const createBook = async (req, res) => {
  const { title, author, category, condition, imageUrl } = req.body;
  const owner = req.user._id; 

  try {
    const newBook = new Book({
      title,
      author,
      category,
      condition,
      imageUrl,
      owner
    });

    await newBook.save();
    res.status(201).json(newBook);
  } catch (error) {
    console.error('Error al crear libro:', error);
    res.status(500).json({ error: 'Error al crear el libro' });
  }
};

const getAllBooks = async (req, res) => {
    try {
      const books = await Book.find().populate('owner', 'name email');
      res.status(200).json(books);
    } catch (error) {
      console.error('Error al obtener libros:', error);
      res.status(500).json({ error: 'Error al obtener los libros' });
    }
};

const getBookById = async (req, res) => {
    const { id } = req.params;
  
    try {
      const book = await Book.findById(id).populate('owner', 'name email');
      if (!book) {
        return res.status(404).json({ error: 'Libro no encontrado' });
      }
      res.status(200).json(book);
    } catch (error) {
      console.error('Error al obtener libro:', error);
      res.status(500).json({ error: 'Error al obtener el libro' });
    }
};

const updateBook = async (req, res) => {
    const { id } = req.params;
    const updates = req.body;
  
    try {
      const updatedBook = await Book.findByIdAndUpdate(id, updates, { new: true });
      if (!updatedBook) {
        return res.status(404).json({ error: 'Libro no encontrado' });
      }
      res.status(200).json(updatedBook);
    } catch (error) {
      console.error('Error al actualizar libro:', error);
      res.status(500).json({ error: 'Error al actualizar el libro' });
    }
};

const deleteBook = async (req, res) => {
    const { id } = req.params;
  
    try {
      const deletedBook = await Book.findByIdAndDelete(id);
      if (!deletedBook) {
        return res.status(404).json({ error: 'Libro no encontrado' });
      }
      res.status(200).json({ message: 'Libro eliminado exitosamente' });
    } catch (error) {
      console.error('Error al eliminar libro:', error);
      res.status(500).json({ error: 'Error al eliminar el libro' });
    }
};

module.exports = { createBook, getAllBooks, getBookById, updateBook, deleteBook}
  
  