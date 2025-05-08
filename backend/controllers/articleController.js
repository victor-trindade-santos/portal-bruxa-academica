const Article = require('../models/Article');
const { upload } = require('../middlewares/upload'); // Importando o middleware de upload
const cloudinary = require('../config/cloudinary'); // Importando a configuração do Cloudinary

// Criar um novo artigo
exports.createArticle = async (req, res) => {
  try {
    // Extraindo os dados do corpo da requisição
    const { title, author, publicationDate, firstContent, subtitle, secondContent, category } = req.body;
    console.log('Valores armazenados:', req.imageUrls);

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

    // 🔹 Buscar o artigo no banco antes de tentar acessar o título
    const existingArticle = await Article.findById(articleId);

    if (!existingArticle) {
      console.log("Artigo não encontrado!");
    } else {
      console.log("Artigo encontrado:", existingArticle.title);
    }
    const { title, author, publicationDate, firstContent, subtitle, secondContent, category } = req.body;
    console.log('Valores armazenados:', req.imageUrls);

    const updatedData = {
      title: title || existingArticle.title, // ✅ Agora está correto!
      author: author || existingArticle.author,
      publicationDate: publicationDate || existingArticle.publicationDate,
      firstContent: firstContent || existingArticle.firstContent,
      subtitle: subtitle || existingArticle.subtitle,
      secondContent: secondContent || existingArticle.secondContent,
      category: category || existingArticle.category,
      imageThumb: req.imageUrls?.imageThumb || existingArticle.imageThumb,  // ✅ Mantém imagem antiga se não houver nova
      imageArticle: req.imageUrls?.imageArticle || existingArticle.imageArticle,  // ✅ Mantém imagem antiga se não houver nova
    };


    if (req.imageUrls) {
      // 🔹 Primeiro, verificamos se `req.imageUrls` existe.
      // Isso evita erros caso nenhuma imagem tenha sido enviada na requisição.

      if (req.imageUrls.imageThumb)
        updatedData.imageThumb = req.imageUrls.imageThumb;
      // 🔹 Se uma imagem de thumbnail foi enviada (`imageThumb` existe),
      // então atualizamos `updatedData.imageThumb` com essa nova imagem.

      if (req.imageUrls.imageArticle)
        updatedData.imageArticle = req.imageUrls.imageArticle;
      // 🔹 Se uma imagem do artigo foi enviada (`imageArticle` existe),
      // então atualizamos `updatedData.imageArticle` com essa nova imagem.

    }

    const updatedArticle = await Article.findByIdAndUpdate(req.params.id, updatedData, { new: true });
    console.log("✅ Artigo atualizado com sucesso:", updatedArticle);

    if (!updatedArticle) {
      return res.status(404).json({ message: 'Artigo não encontrado' });
    }

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