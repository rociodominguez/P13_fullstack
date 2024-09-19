const Book = require('../models/BookModel');

const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
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
  try {
    const { title, author, category, year, pages, status } = req.body;

    // El user viene del middleware de autenticación
    const userId = req.user?._id; 

    // Validar campos requeridos
    if (!title || !author || !status || !userId) {
      return res.status(400).json({ error: 'Todos los campos requeridos deben ser completados' });
    }

    // Crear el nuevo libro asociado al usuario autenticado
    const newBook = new Book({
      title,
      author,
      category,
      year,
      pages,
      status,
      user: userId  // Asocia el libro al ID del usuario autenticado
    });

    // Guardar el libro en la base de datos
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
      return res.status(400).json({ error: 'Status is required' });
    }

    const updatedBook = await Book.findByIdAndUpdate(
      id,
      { status },
      { new: true } // Devuelve el documento actualizado
    );

    if (!updatedBook) {
      return res.status(404).json({ error: 'Book not found' });
    }

    res.json(updatedBook);
  } catch (error) {
    console.error('Error updating book:', error);
    res.status(500).json({ error: 'Error updating book' });
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
    console.error('Error al eliminar el libro:', error);
    res.status(500).json({ error: 'Error al eliminar el libro' });
  }
};

const addBook = async (req, res) => {
  const { title, author, status } = req.body;

  try {
    // Verificar que todos los campos necesarios estén presentes
    if (!title || !author || !status) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Crear un nuevo libro
    const newBook = new Book({
      title,
      author,
      status,
      user: req.user._id, // Asumiendo que se usa el middleware de autenticación para agregar el ID del usuario
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
