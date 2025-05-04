// upload.js
const express = require('express');
const multer = require('multer');
const cloudinary = require('../config/cloudinary');
const { v2: cloudinaryUploader } = require('cloudinary');

const storage = multer.memoryStorage();
const upload = multer({ storage });

// Middleware para subir várias imagens (imageThumb e imageArticle) para o Cloudinary
const uploadToCloudinary = async (req, res, next) => {
  if (!req.files || (!req.files.imageThumb && !req.files.imageArticle)) {
    return res.status(400).json({ message: 'Imagens não enviadas' });
  }

  try {
    const uploadSingle = (file) =>
      new Promise((resolve, reject) => {
        cloudinaryUploader.uploader.upload_stream(
          {
            resource_type: 'image',
            folder: 'artigos',
          },
          (error, result) => {
            if (error) return reject(error);
            resolve(result.secure_url);
          }
        ).end(file.buffer);
      });

    const imageThumbUrl = req.files.imageThumb
      ? await uploadSingle(req.files.imageThumb[0])
      : '';
    const imageArticleUrl = req.files.imageArticle
      ? await uploadSingle(req.files.imageArticle[0])
      : '';

    req.imageUrls = {
      imageThumb: imageThumbUrl,
      imageArticle: imageArticleUrl,
    };

    next();
  } catch (err) {
    next(err);
  }
};

module.exports = {
  upload,
  uploadToCloudinary,
};
