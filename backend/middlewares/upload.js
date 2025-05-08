// upload.js
const express = require('express');
const multer = require('multer');
const cloudinary = require('../config/cloudinary');
const { v2: cloudinaryUploader } = require('cloudinary');
const storage = multer.memoryStorage();
const upload = multer({ storage }).any();




// Middleware para subir várias imagens (imageThumb e imageArticle) para o Cloudinary
const uploadToCloudinary = async (req, res, next) => {
  console.log('Middleware uploadToCloudinary iniciado.');
  console.log('Arquivos recebidos:', req.files);
  console.log('Body recebido:', req.body);

  if (!req.files || Object.keys(req.files).length === 0) {
    console.error('⚠️ Nenhuma nova imagem enviada, mantendo URLs existentes.');
    
    req.imageUrls ={
      imageThumb: req.body.imageThumb || "", // Mantém a URL do frontend, se disponível
      imageArticle: req.body.imageArticle || "" // Mantém a URL do frontend, se disponível
    };
    return next();  // Pulamos o processo de upload e seguimos para a atualização do artigo
  }

  const imageThumbFile = req.files.find(file => file.fieldname === 'imageThumb');
  const imageArticleFile = req.files.find(file => file.fieldname === 'imageArticle');

  console.log('Iniciando upload para Cloudinary');
  console.log('Thumb recebido:', imageThumbFile);
  console.log('Article recebido:', imageArticleFile);

  try {
    console.log("🚀 Iniciando upload para Cloudinary...");
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

    const imageThumbUrl = imageThumbFile
      ? await uploadSingle(imageThumbFile)
      : req.body.imageThumb;

    const imageArticleUrl = imageArticleFile
      ? await uploadSingle(imageArticleFile)
      : req.body.imageArticle;

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
