const Article = require('../models/Article');
const { upload } = require('../middlewares/upload'); // Importando o middleware de upload
const cloudinary = require('../config/cloudinary'); // Importando a configuração do Cloudinary

// Criar um novo artigo
exports.createArticle = async (req, res) => {
  try {
    // Extraindo os dados do corpo da requisição
    const { title, author, publicationDate, firstContent, subtitle, secondContent, category } = req.body;

    // As URLs das imagens já foram processadas no middleware e estão em req.imageUrls
    const newArticle = new Article({
      title,
      author,
      publicationDate,
      firstContent,
      subtitle,
      secondContent,
      category,
      imageThumb: req.imageUrls.imageThumb || '',
      imageArticle: req.imageUrls.imageArticle || '',
    });

    // Salvar o novo artigo no banco de dados
    await newArticle.save();
    res.status(201).json({ message: 'Artigo criado com sucesso!', article: newArticle });
  } catch (error) {
    console.error('Erro ao salvar o artigo:', error);
    res.status(500).json({ message: 'Erro ao salvar o artigo', error: error.message });
  }
};

// Obter todos os artigos (ou filtrar por categoria)
exports.getArticles = async (req, res) => {
  try {
    const { category } = req.query;

    const articles = category
      ? await Article.find({ category: { $regex: new RegExp(category, 'i') } })
      : await Article.find();

    // Responde com a lista de artigos encontrados
    res.status(200).json(articles);
  } catch (error) {
    // Responde com erro caso algo dê errado
    res.status(500).json({ message: 'Erro ao buscar artigos', error: error.message });
  }
};
