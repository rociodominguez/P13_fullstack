const express = require('express');
const { getAllBooks, createBook, getBookById, updateBook, deleteBook } = require('../controllers/BookControllers');
const isAuth = require('../../middleware/auth');

const bookRouter = express.Router();

bookRouter.get('/getbooks', getAllBooks);
bookRouter.get('/getbooks/:id', [isAuth], getBookById);
bookRouter.post('/createbooks', [isAuth], createBook);
bookRouter.put('/putbooks/:id', [isAuth], updateBook);
bookRouter.delete('/deletebooks/:id', [isAuth], deleteBook)

module.exports = bookRouter;