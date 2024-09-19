const express = require('express');
const { createBook, updateBook, getAllBooks } = require('../controllers/BookControllers');
const isAuth = require('../../middleware/auth');
const bookRouter = express.Router();

bookRouter.post('/add', isAuth, createBook);
bookRouter.put('/update/:id', isAuth, updateBook);
bookRouter.get('/', getAllBooks);


module.exports = bookRouter;
