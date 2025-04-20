const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth');
const { createArticle, getArticles } = require('../controllers/articleController');

router.post('/', authMiddleware('admin'), createArticle);
router.get('/', authMiddleware('admin'), getArticles);

module.exports = router;
