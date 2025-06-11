// backend/db.js
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI;

    if (!mongoURI) {
      console.error('ERRO: Variável de ambiente MONGO_URI não definida! (Verifique no Render)');
      process.exit(1);
    }

    // Apenas remova as opções depreciadas
    await mongoose.connect(mongoURI); // Sem o { useNewUrlParser: true, useUnifiedTopology: true }

    console.log('Conectado ao MongoDB no banco PortalBruxa!');
  } catch (error) {
    console.error('Erro ao conectar ao MongoDB:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;