const multer = require('multer');
const { v2: cloudinary } = require('cloudinary');

const storage = multer.memoryStorage();
const upload = multer({ storage });

const uploadProfileImage = [
    upload.single('profileImg'),
    async (req, res, next) => {
        if (!req.file) {
            console.warn('⚠️ Nenhuma imagem de perfil enviada.');
            return res.status(400).json({ message: 'Nenhuma imagem enviada' });
        }

        try {
            const result = await new Promise((resolve, reject) => {
                cloudinary.uploader.upload_stream(
                    {
                        folder: 'perfil',
                        resource_type: 'image',
                    },
                    (error, result) => {
                        if (error) return reject(error);
                        resolve(result);
                    }
                ).end(req.file.buffer);
            });

            req.profileImgUrl = result.secure_url;
            next();
        } catch (error) {
            console.error('Erro no upload da imagem de perfil:', error);
            res.status(500).json({ message: 'Erro ao fazer upload da imagem', error: error.message });
        }
    }
];

module.exports = uploadProfileImage;