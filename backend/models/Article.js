const mongoose = require('mongoose');

const ArticleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  imageUrl: { type: String },
  category: { type: String, required: true },
}, { collection: 'Artigos' });

module.exports = mongoose.model('Artigos', ArticleSchema);
