const Book = require('../models/BookModel');

const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find({ user: req.user._id }); 
    res.status(200).json(books);
  } catch (error) {
    console.error('Error al obtener libros:', error);
    res.status(500).json({ error: 'Error al obtener libros' });
  }
};

const getBookById = async (req, res) => {
  const { id } = req.params;
  try {
    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).json({ error: 'Libro no encontrado' });
    }
    res.status(200).json(book);
  } catch (error) {
    console.error('Error al obtener el libro:', error);
    res.status(500).json({ error: 'Error al obtener el libro' });
  }
};

const createBook = async (req, res) => {
  const { title, author, category, year, pages, status } = req.body;

  if (!title || !author || !status) {
    return res.status(400).json({ error: 'Todos los campos requeridos deben ser completados.' });
  }

  try {
    const newBook = new Book({
      title,
      author,
      category,
      year,
      pages,
      status,
      user: req.user._id 
    });

    await newBook.save();
    res.status(201).json(newBook);
  } catch (error) {
    console.error('Error al crear el libro:', error);
    res.status(500).json({ error: 'Error al crear el libro' });
  }
};

const updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ error: 'El estado del libro es obligatorio' });
    }

    const book = await Book.findById(id);

    if (!book) {
      return res.status(404).json({ error: 'Libro no encontrado' });
    }

    if (book.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'No tienes permiso para actualizar este libro' });
    }

    book.status = status;
    const updatedBook = await book.save();

    res.json(updatedBook);
  } catch (error) {
    console.error('Error al actualizar el libro:', error);
    res.status(500).json({ error: 'Error al actualizar el libro' });
  }
};

const deleteBook = async (req, res) => {
  const { id } = req.params;
  try {
    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).json({ error: 'Libro no encontrado' });
    }

    if (book.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'No tienes permiso para eliminar este libro' });
    }

    await book.deleteOne();
    res.status(200).json({ message: 'Libro eliminado exitosamente' });
  } catch (error) {
    console.error('Error al eliminar el libro:', error);
    res.status(500).json({ error: 'Error al eliminar el libro' });
  }
};

const addBook = async (req, res) => {
  const { title, author, status } = req.body;

  try {
    if (!title || !author || !status) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const newBook = new Book({
      title,
      author,
      status,
      user: req.user._id, 
    });

    const savedBook = await newBook.save();
    res.status(201).json(savedBook);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add book' });
  }
};

module.exports = {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
  addBook  
};
