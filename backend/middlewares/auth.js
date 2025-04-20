const jwt = require('jsonwebtoken');

// Middleware para verificar se o usuário está autenticado e autorizado
const authMiddleware = (roleRequired) => {
  return (req, res, next) => {
    // Verificando se o token está presente no cabeçalho
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ message: 'Acesso negado. Nenhum token fornecido.' });
    }
    
    try {
      // Verificando o token e extraindo as informações
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;

      // Se o role necessário for passado, vamos verificar
      if (roleRequired && req.user.role !== roleRequired) {
        return res.status(403).json({ message: 'Acesso negado. Você não tem permissão.' });
      }

      next();
    } catch (error) {
      res.status(400).json({ message: 'Token inválido.' });
    }
  };
};

module.exports = authMiddleware;
