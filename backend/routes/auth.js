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

    // Logando o hash da senha armazenada
    console.log('Senha armazenada no banco:', user.password);

    // Comparando as senhas
    console.log('Senha digitada:', password); // Texto puro
    console.log('Hash armazenado no banco:', user.password); // Hash no banco
    const isMatch = await bcrypt.compare(password, user.password);
    console.log('Resultado da comparação:', isMatch); // true ou false    
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

// Rota de registro
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Verifica se já existe usuário com esse username
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username já cadastrado' });
    }

    // Cria um novo usuário com role padrão 'user'
    const newUser = new User({ username, email: email || '', password, role: 'user' });

    // Encriptando a senha
    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(password, salt);

    // Logando a senha criptografada
    console.log('Senha criptografada:', newUser.password);

    await newUser.save();
    res.status(201).json({ message: 'Usuário registrado com sucesso!' });
  } catch (error) {
    console.error('Erro no registro:', error);
    res.status(500).json({ message: 'Erro ao registrar usuário', error: error.message });
  }
});

module.exports = router;
