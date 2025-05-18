const mongoose = require('mongoose');

const ArticleSchema = new mongoose.Schema({
  title: { type: String, required: true },             // Título do artigo
  author: { type: String, required: true },            // Nome do autor
  publicationDate: { type: String, required: true },   // Data de publicação
  firstContent: { type: String, required: true },      // Primeiro parágrafo ou bloco de conteúdo
  secondContent: { type: String, required: true },     // Segundo parágrafo ou bloco de conteúdo
  
imageThumb: { type: mongoose.Schema.Types.Mixed, required: true },
       // Capa/thumbnail do artigo
  category: { type: String, required: true },          // Categoria do artigo
}, { collection: 'Artigos' });

module.exports = mongoose.model('Artigos', ArticleSchema);
