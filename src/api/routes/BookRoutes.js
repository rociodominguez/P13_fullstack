const express = require('express');
const { createBook, updateBook, getAllBooks, addBook, deleteBook } = require('../controllers/BookControllers');
const isAuth = require('../../middleware/auth');
const bookRouter = express.Router();

bookRouter.post('/add', isAuth, createBook);
bookRouter.put('/update/:id', isAuth, updateBook);
bookRouter.get('/', getAllBooks);
bookRouter.post('/discovered/add', isAuth, addBook);
bookRouter.delete('/:id/delete', isAuth, deleteBook);




module.exports = bookRouter;
