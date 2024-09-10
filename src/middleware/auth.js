const User = require("../api/models/UserModel");
const jwt = require('jsonwebtoken');

const isAuth = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
  
    if (!token) {
      return res.status(401).json({ error: 'No autenticado' });
    }
  
    try {
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decodedToken.id);
  
      if (!user) {
        return res.status(401).json({ error: 'Usuario no encontrado' });
      }
  
      req.user = {  
        _id: user._id
      };
      next();
    } catch (err) {
      console.error('Error al verificar el token:', err);
      return res.status(401).json({ error: 'Token inválido' });
    }
  };


module.exports = isAuth