const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth');
const { upload, uploadToCloudinary } = require('../middlewares/upload');
const { createArticle, getArticles } = require('../controllers/articleController');

router.post(
  '/',
  authMiddleware('admin'),
  upload.fields([
    { name: 'imageThumb', maxCount: 1 },
    { name: 'imageArticle', maxCount: 1 },
  ]),
  uploadToCloudinary,
  createArticle
);

router.get('/', getArticles);

module.exports = router;
