const express = require('express');
const { registerUser, loginUser, getUser, updateReadingGoal } = require('../controllers/UserControllers');
const isAuth = require('../../middleware/auth');

const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.get('/me', isAuth, getUser);
userRouter.put('/update-reading-goal', isAuth, updateReadingGoal);


module.exports = userRouter;