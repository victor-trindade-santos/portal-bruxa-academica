const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true, // Garante que o nome de usuário será único
  },
  email: {
    type: String,
    required: function () { return this.role === 'user'; }, // Email é requerido apenas para users
    unique: true, // Garante que o email será único
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user', // Valor padrão para novos usuários
  },
  fullName: {
    type: String,
    required: true,
  },
  birthDate: {
    type: Date,
    required: false,
  },
  birthTime: {
    type: String, // Armazena no formato 'HH:mm'
    required: false,
  },
    birthCity: {
    type: String, // Armazena no formato 'HH:mm'
    required: false,
  },
}, { collection: 'Users' });

// Encriptar a senha antes de salvar no banco
UserSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    if (!this.password.startsWith('$2b$')) { // Evita re-hash se já for um hash do bcrypt
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
    }
  }
  next();
});

module.exports = mongoose.model('User', UserSchema);
