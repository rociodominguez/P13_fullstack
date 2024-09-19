const express = require('express');
const { registerUser, loginUser, getUser } = require('../controllers/UserControllers');
const isAuth = require('../../middleware/auth');

const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.get('/me', isAuth, getUser);



module.exports = userRouter;