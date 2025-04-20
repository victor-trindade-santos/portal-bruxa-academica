require('dotenv').config();  // Adicionando o dotenv no início do arquivo

const express = require('express');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Rota de login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  // Logando o que está sendo recebido
  console.log('Recebido no login:', { username, password });

  try {
    const user = await User.findOne({ username });
    if (!user) {
      console.log('Usuário não encontrado!');
      return res.status(400).json({ message: 'Usuário não encontrado' });
    }

    // Comparando as senhas
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Senha incorreta' });

    // Criando o payload do JWT (incluir a role)
    const payload = {
      userId: user._id,
      role: user.role,  // Incluindo a role aqui
    };

    // Gerando o token
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Enviando a resposta incluindo a role
    res.status(200).json({
      message: 'Login bem-sucedido!',
      token,
      username: user.username,
      role: user.role,  // Incluindo a role na resposta
    });
  } catch (error) {
    console.error('Erro no login:', error);
    res.status(500).json({ message: 'Erro ao fazer login', error: error.message });
  }
});


module.exports = router;
