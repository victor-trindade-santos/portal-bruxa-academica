const jwt = require('jsonwebtoken');

const authMiddleware = (roleRequired = null) => {
  return (req, res, next) => {
    const authHeader = req.header('Authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      if (!roleRequired) return next(); // rota pública
      return res.status(401).json({ message: 'Token não fornecido ou mal formatado' });
    }

    const token = authHeader.replace('Bearer ', '').trim();

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;

      if (
        roleRequired &&
        (!req.user.role || req.user.role.toLowerCase() !== roleRequired.toLowerCase())
      ) {
        return res.status(403).json({ message: 'Acesso negado. Permissão insuficiente.' });
      }

      next();
    } catch (err) {
      console.error('Erro ao verificar token:', err);
      res.status(401).json({ message: 'Token inválido ou expirado' });
    }
  };
};

module.exports = authMiddleware;