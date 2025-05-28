// models/Article.js (ou onde quer que seu schema de artigo esteja definido)

const mongoose = require('mongoose');

const ArticleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true, // Título continua sendo obrigatório para rascunho
        trim: true,
    },
    author: {
        type: String,
        required: function() {
            // Este campo é obrigatório APENAS se o artigo NÃO for um rascunho.
            // Se isDraft for true, ele não é obrigatório.
            return !this.isDraft;
        },
        trim: true,
    },
    publicationDate: {
        type: Date,
        // Não é required aqui, será preenchido no controller quando isDraft for false
    },
    firstContent: {
        type: String,
        required: function() {
            return !this.isDraft;
        },
    },
    secondContent: {
        type: String,
        required: function() {
            return !this.isDraft;
        },
    },
    category: {
        type: String,
        required: function() {
            return !this.isDraft;
        },
        enum: ['','Numerologia', 'Magia', 'Astrologia', 'Tarot'], // Exemplo, mantenha seus enums
    },
    imageThumb: {
        type: mongoose.Schema.Types.Mixed, // Para armazenar a URL da imagem
        required: function() {
            return !this.isDraft; // A imagem é obrigatória apenas se não for rascunho
        },
        default: '', // Pode ter um valor padrão se não for obrigatório
    },
    isDraft: {
        type: Boolean,
        default: true, // Por padrão, um artigo pode começar como rascunho
        required: true, // O status de rascunho/publicado é sempre necessário
    },
}, {
    collection: 'Artigos',
    timestamps: true, // Isso adicionará createdAt e updatedAt automaticamente
});

module.exports = mongoose.model('Article', ArticleSchema);