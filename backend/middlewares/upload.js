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
  console.log('req.file:', req.file);
  console.log('req.files:', req.files);
  console.log('Body recebido:', req.body);

  try {
    // Processar imagens base64 no secondContent (se houver)
    if (req.body.secondContent) {
      let content = req.body.secondContent;
      const base64Imgs = content.match(/<img[^>]+src="data:image\/[^">]+"[^>]*>/g) || [];

      for (const imgTag of base64Imgs) {
        const srcMatch = imgTag.match(/src="([^"]+)"/);
        if (!srcMatch) continue;

        const base64Data = srcMatch[1];

        const uploaded = await new Promise((resolve, reject) => {
          cloudinaryUploader.uploader.upload_stream(
            { folder: 'artigos' },
            (error, result) => {
              if (error) {
                console.error('Erro no upload da imagem base64:', error);
                return reject(error);
              }
              resolve(result.secure_url);
            }
          ).end(Buffer.from(base64Data.split(",")[1], 'base64'));
        });

        content = content.replace(base64Data, uploaded);
      }
      req.body.secondContent = content;
    }

    if (!req.files || req.files.length === 0) {
      console.warn('⚠️ Nenhuma nova imagem enviada, mantendo URLs existentes.');
      req.imageUrls = {
        imageThumb: req.body.imageThumb || "",
      };
      return next();
    }

    const imageThumbFile = req.files.find(file => file.fieldname === 'imageThumb');

    if (!imageThumbFile) {
      console.warn('⚠️ Arquivo imageThumb não encontrado em req.files');
      req.imageUrls = {
        imageThumb: req.body.imageThumb || "",
      };
      return next();
    }

    console.log('Iniciando upload para Cloudinary da imagem thumb...');
    const uploadSingle = (file) =>
      new Promise((resolve, reject) => {
        cloudinaryUploader.uploader.upload_stream(
          {
            resource_type: 'image',
            folder: 'artigos',
          },
          (error, result) => {
            if (error) {
              console.error('Erro no upload da imagem:', error);
              return reject(error);
            }
            console.log('Upload para Cloudinary realizado com sucesso:', result.secure_url);
            resolve(result.secure_url);
          }
        ).end(file.buffer);
      });

    const imageThumbUrl = await uploadSingle(imageThumbFile);

    req.imageUrls = {
      imageThumb: imageThumbUrl,
    };

    next();

  } catch (err) {
    console.error('Erro no middleware uploadToCloudinary:', err);
    next(err);
  }
};



module.exports = {
  upload,
  uploadToCloudinary,
};
