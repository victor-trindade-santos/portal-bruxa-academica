const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: function () { return this.role === 'user'; }, // Email é requerido apenas para users
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
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

  profileImgUrl: {
    type: String, 
    required: false,
  },

  // DADOS RELACIONANDOS COM O MAPA ASTRAL
  sunSign: { type: String },
  sunDescription: { type: String },
  moonSign: { type: String },
  moonDescription: { type: String },
  ascendantSign: { type: String },
  ascendantDescription: { type: String },
  mapaCalculadoEm: { type: Date },
}, { collection: 'Users' });


UserSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    if (!this.password.startsWith('$2b$')) {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
    }
  }
  next();
});

module.exports = mongoose.model('User', UserSchema);
