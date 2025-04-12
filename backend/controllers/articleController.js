const Article = require('../models/Article');

// Criar um novo artigo
exports.createArticle = async (req, res) => {
  try {
    const { title, content, imageUrl, category } = req.body; // Inclui categoria
    const newArticle = new Article({ title, content, imageUrl, category });
    await newArticle.save();
    res.status(201).json({ message: 'Artigo criado com sucesso!', article: newArticle });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar o artigo', error: error.message });
  }
};

// Obter todos os artigos (ou filtrar por categoria)
exports.getArticles = async (req, res) => {
  try {
    const { category } = req.query; // Filtra por categoria, se passado na query
    const articles = category
      ? await Article.find({ category })
      : await Article.find();
    res.status(200).json(articles);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar artigos', error: error.message });
  }
};
