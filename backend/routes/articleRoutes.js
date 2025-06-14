const express = require('express');
const router = express.Router();
const { upload, uploadToCloudinary } = require('../middlewares/upload');
const { createArticle, getArticles, getArticleById, updateArticle, deleteArticleById, getDraftArticles} = require('../controllers/articleController');


router.post('/', upload, uploadToCloudinary, createArticle);

// Atualizar artigo existente (PUT /articles/:id)
router.put(
  '/:id', upload,
  uploadToCloudinary,  // Manter apenas o uploadToCloudinary
  updateArticle  // A função updateArticle já vai receber as imagens processadas
);

router.get('/drafts', getDraftArticles);

// Buscar artigo por ID (GET /articles/:id)
router.get('/:id', getArticleById);

// Buscar todos os artigos (GET /articles)
router.get('/', getArticles);

// Rota para excluir artigo (rota DELETE)
router.delete('/:id', deleteArticleById);





module.exports = router;
