const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://grupoPortalBruxa:70mXwswFxDEVfiDm@bruxa.zjcjnfv.mongodb.net/PortalBruxa?retryWrites=true&w=majority');
    console.log('Conectado ao MongoDB no banco PortalBruxa!');
  } catch (error) {
    console.error('Erro ao conectar ao MongoDB:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
