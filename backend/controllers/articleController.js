const Article = require('../models/Article');
const { upload } = require('../middlewares/upload'); // Importando o middleware de upload
const cloudinary = require('../config/cloudinary'); // Importando a configuração do Cloudinary

// Criar um novo artigo
exports.createArticle = async (req, res) => {
    try {
        const {
            title,
            author,
            // publicationDate, // Não precisamos receber do frontend se vamos definir aqui
            firstContent,
            secondContent,
            category,
            isDraft = 'true', // Valor padrão para o corpo da requisição
        } = req.body;

        console.log('Dados do corpo da requisição:', req.body);
        console.log('URLs das imagens processadas:', req.imageUrls);

        const imageThumb = (req.imageUrls && req.imageUrls.imageThumb) || '';

        // Determine o status de rascunho booleano
        const isArticleDraft = isDraft === 'true';

        // Defina a data de publicação apenas se o artigo NÃO for um rascunho (ou seja, está sendo publicado)
        // Se for um rascunho, publicationDate será null/undefined no momento da criação
        let finalPublicationDate = null;
        if (!isArticleDraft) {
            finalPublicationDate = new Date(); // Captura a data e hora atuais no servidor
        }

        const newArticle = new Article({
            title,
            author,
            publicationDate: finalPublicationDate, // Atribuímos a data ou null
            firstContent,
            secondContent,
            category,
            imageThumb,
            isDraft: isArticleDraft, // Atribuímos o status booleano
        });

        await newArticle.save();

        res.status(201).json({ message: 'Artigo criado/salvo com sucesso!', article: newArticle });
    } catch (error) {
        console.error('Erro ao salvar o artigo:', error);
        res.status(500).json({ message: 'Erro ao salvar o artigo', error: error.message });
    }
};

exports.getDraftArticles = async (req, res) => {
    try {
        // Encontra todos os artigos onde isDraft é verdadeiro
        // Ordena pelos mais recentes (createdAt decrescente)
        const drafts = await Article.find({ isDraft: true }).sort({ createdAt: -1 });
        res.status(200).json(drafts);
    } catch (error) {
        console.error('Erro ao buscar rascunhos:', error);
        res.status(500).json({ message: 'Erro ao buscar rascunhos', error: error.message });
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
// controllers/articleController.js

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

        const {
            title,
            author,
            firstContent,
            secondContent,
            category,
            isDraft // Adicione isDraft aqui para recebê-lo do frontend
        } = req.body;

        // Converta isDraft para booleano. Se não for enviado ou for algo diferente de 'true'/'false',
        // assume o valor existente (ou false se for o padrão).
        const newIsDraftStatus = typeof isDraft === 'string' ? (isDraft === 'true') : existingArticle.isDraft;

        let finalPublicationDate = existingArticle.publicationDate; // Mantenha a data existente por padrão

        // Lógica para definir a data de publicação:
        // Se o artigo era um rascunho (existingArticle.isDraft é true)
        // E o novo status é 'publicado' (newIsDraftStatus é false)
        // E ainda não tem uma data de publicação (nunca foi publicado antes)
        // Então, definimos a data de publicação para o momento atual.
        if (existingArticle.isDraft && !newIsDraftStatus && !existingArticle.publicationDate) {
            finalPublicationDate = new Date(); // Define a data e hora atuais no servidor
            console.log("Artigo mudando de rascunho para publicado. Definindo nova data de publicação:", finalPublicationDate);
        }
        // Se a intenção é que a data de publicação seja limpa ao voltar para rascunho:
        else if (!newIsDraftStatus && existingArticle.isDraft) { // Se estava publicado e virou rascunho
            finalPublicationDate = null; // Limpa a data de publicação
        }


        const updatedData = {
            // AQUI ESTÁ A MUDANÇA CRÍTICA:
            // Atribua diretamente o valor recebido se ele NÃO FOR undefined.
            // Strings vazias (e até null, se o frontend enviar null explicitamente para um campo)
            // serão persistidas.
            title: title !== undefined ? title : existingArticle.title,
            author: author !== undefined ? author : existingArticle.author,
            firstContent: firstContent !== undefined ? firstContent : existingArticle.firstContent,
            secondContent: secondContent !== undefined ? secondContent : existingArticle.secondContent,
            category: category !== undefined ? category : existingArticle.category,
            isDraft: newIsDraftStatus, // Atualiza o status de rascunho
            publicationDate: finalPublicationDate, // Atualiza a data de publicação
        };

        // Lógica para a imagem:
        // req.imageUrls é provavelmente do seu middleware de upload.
        if (req.imageUrls && req.imageUrls.imageThumb) {
            // Se uma NOVA imagem foi enviada (via upload), use a URL do upload
            updatedData.imageThumb = req.imageUrls.imageThumb;
        } else if (Object.prototype.hasOwnProperty.call(req.body, 'imageThumb') && (req.body.imageThumb === null || req.body.imageThumb === '')) {
            // Se o campo imageThumb foi enviado no corpo da requisição E é null ou string vazia,
            // significa que o frontend quer limpar a imagem existente.
            updatedData.imageThumb = ''; // Defina para string vazia ou null no DB.
        } else {
            // Caso contrário, mantenha a imagem existente no artigo (não foi enviada nova, nem foi solicitado para limpar)
            updatedData.imageThumb = existingArticle.imageThumb;
        }


        const updatedArticle = await Article.findByIdAndUpdate(articleId, updatedData, { new: true });

        console.log("✅ Artigo atualizado com sucesso:", updatedArticle);
        res.status(200).json(updatedArticle); // Retorne apenas o objeto do artigo atualizado
        // Anteriormente: res.status(200).json({ message: 'Artigo atualizado com sucesso', article: updatedArticle });
        // Mudei para retornar diretamente o artigo atualizado, pois o frontend espera isso no setFormDataArticle.

    } catch (error) {
        console.error('❌ Erro ao atualizar artigo:', error);
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