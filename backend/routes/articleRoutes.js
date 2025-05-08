const express = require('express');
const router = express.Router();
const { upload, uploadToCloudinary } = require('../middlewares/upload');
const authMiddleware = require('../middlewares/auth'); // Adicionando a importação do authMiddleware
const { createArticle, getArticles, getArticleById, updateArticle, deleteArticle, deleteArticle2, rotaDelete2 } = require('../controllers/articleController');


router.post('/', upload, uploadToCloudinary, createArticle);

// Atualizar artigo existente (PUT /articles/:id)
router.put(
  '/:id', upload,
  uploadToCloudinary,  // Manter apenas o uploadToCloudinary
  updateArticle  // A função updateArticle já vai receber as imagens processadas
);

// Buscar todos os artigos (GET /articles)
router.get('/', getArticles);

// Buscar artigo por ID (GET /articles/:id)
router.get('/:id', getArticleById);

router.get("/del/:id", rotaDelete2);

//router.delete("/articles1/", deleteArticle2);

module.exports = router;
