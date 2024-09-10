const { generateToken } = require('../../utils/jsonwebtoken');
const User = require('../models/UserModel');
const bcrypt = require('bcrypt')

const registerUser = async (req, res, next) => {
  try {
    const { name, password, email } = req.body;

    if (!name || !password || !email) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' });
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
      userId: user._id
    });
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    res.status(500).json({ error: 'Error en el inicio de sesión' });
  }
};


module.exports = {
  registerUser,
  loginUser
};
