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

  try {
    // 1. Processar as imagens base64 do secondContent
    if (req.body.secondContent) {
      let content = req.body.secondContent;

      // Regex para pegar todas imagens base64 (src="data:image/…")
      const base64Imgs = content.match(/<img[^>]+src="data:image\/[^">]+"[^>]*>/g) || [];

      for (const imgTag of base64Imgs) {
        const srcMatch = imgTag.match(/src="([^"]+)"/);
        if (!srcMatch) continue;

        const base64Data = srcMatch[1];

        // Upload da imagem base64 para Cloudinary
        const uploaded = await new Promise((resolve, reject) => {
          cloudinaryUploader.uploader.upload_stream(
            { folder: 'artigos' },
            (error, result) => {
              if (error) return reject(error);
              resolve(result.secure_url);
            }
          ).end(Buffer.from(base64Data.split(",")[1], 'base64'));
        });

        // Substitui a imagem base64 pelo link do Cloudinary
        content = content.replace(base64Data, uploaded);
      }

      // Atualiza o body com o conteúdo já substituído
      req.body.secondContent = content;
    }

    if (!req.files || Object.keys(req.files).length === 0) {
      console.error('⚠️ Nenhuma nova imagem enviada, mantendo URLs existentes.');

      req.imageUrls = {
        imageThumb: req.body.imageThumb || "", // Mantém a URL do frontend, se disponível
      };
      return next();  // Pulamos o processo de upload e seguimos para a atualização do artigo
    }

    const imageThumbFile = req.files.find(file => file.fieldname === 'imageThumb');

    console.log('Iniciando upload para Cloudinary');
    console.log('Thumb recebido:', imageThumbFile);

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
