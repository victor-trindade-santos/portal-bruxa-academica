const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth');  // Middleware de autenticação
const { createArticle, getArticles } = require('../controllers/articleController');

// Rota para obter os artigos - Acessível para todos os usuários, logados ou não
router.get('/', getArticles);

// Rota para criar artigo - Somente para administradores
router.post('/', authMiddleware('admin'), createArticle);

// Rota para atualizar artigo - Somente para administradores (se necessário)
// router.put('/:id', authMiddleware('admin'), updateArticle);

// Rota para excluir artigo - Somente para administradores (se necessário)
// router.delete('/:id', authMiddleware('admin'), deleteArticle);

module.exports = router;
