const Article = require('../models/Article');
const { upload } = require('../middlewares/upload'); // Importando o middleware de upload
const cloudinary = require('../config/cloudinary'); // Importando a configuração do Cloudinary

// Criar um novo artigo
exports.createArticle = async (req, res) => {
  try {
    const {
      title,
      author,
      publicationDate,
      firstContent,
      secondContent,
      category,
    } = req.body;

    console.log('Dados do corpo da requisição:', req.body);
    console.log('URLs das imagens processadas:', req.imageUrls);

    // Verifica se imageThumb está definido, senão usa string vazia
    const imageThumb = (req.imageUrls && req.imageUrls.imageThumb) || '';

    const newArticle = new Article({
      title,
      author,
      publicationDate,
      firstContent,
      secondContent,
      category,
      imageThumb,
    });

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

exports.getArticleById = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);

    if (!article) {
      return res.status(404).json({ message: 'Artigo não encontrado' });
    }

    res.status(200).json(article);
  } catch (error) {
    console.error('Erro ao buscar artigo por ID:', error);
    res.status(500).json({ message: 'Erro ao buscar artigo', error: error.message });
  }
};

// Atualizar um artigo existente
exports.updateArticle = async (req, res) => {
  try {
    const articleId = req.params.id;
    console.log("Requisição PUT recebida para atualizar o artigo ID:", articleId);

    const existingArticle = await Article.findById(articleId);
    if (!existingArticle) {
      console.log("Artigo não encontrado!");
      return res.status(404).json({ message: 'Artigo não encontrado' });
    }

    console.log("Artigo encontrado:", existingArticle.title);

    const { title, author, publicationDate, firstContent, secondContent, category } = req.body;
    console.log('Valores armazenados:', req.imageUrls);

    const updatedData = {
      title: title || existingArticle.title,
      author: author || existingArticle.author,
      publicationDate: publicationDate || existingArticle.publicationDate,
      firstContent: firstContent || existingArticle.firstContent,
      secondContent: secondContent || existingArticle.secondContent,
      category: category || existingArticle.category,
      imageThumb: req.imageUrls?.imageThumb || existingArticle.imageThumb,
    };

    const updatedArticle = await Article.findByIdAndUpdate(articleId, updatedData, { new: true });

    console.log("✅ Artigo atualizado com sucesso:", updatedArticle);
    res.status(200).json({ message: 'Artigo atualizado com sucesso', article: updatedArticle });

  } catch (error) {
    console.error('Erro ao atualizar artigo:', error);
    res.status(500).json({ message: 'Erro ao atualizar artigo', error: error.message });
  }
};


exports.deleteArticleById = async (req, res) => {
  try {
    const articleId = req.params.id;
    console.log("Tentando excluir o artigo com ID:", articleId);

    const article = await Article.findByIdAndDelete(articleId);

    if (!article) {
      console.log("Artigo não encontrado no banco.");
      return res.status(404).json({ message: 'Artigo não encontrado' });
    }

    console.log("Artigo excluído com sucesso:", article);
    res.status(200).json({ message: 'Artigo deletado com sucesso' });
  } catch (error) {
    console.error('Erro ao deletar artigo por ID:', error);
    res.status(500).json({ message: 'Erro ao deletar artigo', error: error.message });
  }
};