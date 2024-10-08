const { generateToken } = require('../../utils/jsonwebtoken');
const User = require('../models/UserModel');
const bcrypt = require('bcrypt')

const registerUser = async (req, res, next) => {
  try {
    const { name, password, email } = req.body;

    if (!name || !password || !email) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: 'La contraseña debe tener al menos 6 caracteres' });
    }

    const existingUser = await User.findOne({ name });
    if (existingUser) {
      return res.status(409).json({ error: 'El nombre de usuario ya está en uso' });
    }
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(409).json({ error: 'El correo electrónico ya está en uso' });
    }

    const newUser = new User({
      name,
      email,
      password
    });

    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(password, salt);

    await newUser.save();

    const token = generateToken(newUser);

    res.status(201).json({ user: newUser, token });
    
  } catch (error) {
    console.error('Error al registrar usuario:', error.message);
    res.status(500).json({ error: 'Ocurrió un error en el servidor.' });
  }
};

const loginUser = async (req, res) => {
  const { name, password } = req.body;

  try {
    const user = await User.findOne({ name });
    if (!user) {
      return res.status(401).json({ error: 'Usuario no encontrado' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Contraseña incorrecta' });
    }

    const token = generateToken(user);
    res.status(200).json({
      token,
      userId: user._id,
      name: user.name,
      readingGoal: user.readingGoal 
    });
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    res.status(500).json({ error: 'Error en el inicio de sesión' });
  }
};

const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    
    res.json({
      name: user.name,
      email: user.email,
      readingGoal: user.readingGoal
    });
  } catch (error) {
    console.error('Error al obtener información del usuario:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
};

const getUserBooks = async (req, res) => {
  try {
    const books = await Book.find({ user: req.user._id }); 
    res.json(books);
  } catch (error) {
    console.error('Error al obtener los libros del usuario:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
};

const updateReadingGoal = async (req, res) => {
  const { readingGoal } = req.body;

  try {
    const user = await User.findByIdAndUpdate(req.user._id, { readingGoal }, { new: true });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar el objetivo de lectura." });
  }
};




module.exports = {
  registerUser,
  loginUser,
  getUser,
  updateReadingGoal,
  getUserBooks
};