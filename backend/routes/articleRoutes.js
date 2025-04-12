const express = require('express');
const router = express.Router();
const { createArticle, getArticles } = require('../controllers/articleController');

// Criar artigo
router.post('/', createArticle);

// Obter artigos (com ou sem filtro de categoria)
router.get('/', getArticles);

module.exports = router;
