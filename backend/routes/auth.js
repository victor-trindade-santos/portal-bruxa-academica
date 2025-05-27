require('dotenv').config();

const express = require('express');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();
const authenticateToken = require('../middlewares/auth');
const uploadProfileImage = require('../middlewares/uploadProfileImage');

router.get('/me', authenticateToken(), async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error('Erro ao buscar usuário:', error);
    res.status(500).json({ message: 'Erro ao buscar dados do usuário', error: error.message });
  }
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  console.log('Recebido no login:', { username, password });

  try {
    const user = await User.findOne({ username });
    if (!user) {
      console.log('Usuário não encontrado!');
      return res.status(400).json({ message: 'Usuário não encontrado' });
    }

    console.log(user)

    console.log('Usuário encontrado:', {
      username: user.username,
      email: user.email,
      birthDate: user.birthDate,
    });

    console.log('Senha armazenada no banco:', user.password);

    console.log('Senha digitada:', password);
    console.log('Hash armazenado no banco:', user.password);
    const isMatch = await bcrypt.compare(password, user.password);
    console.log('Resultado da comparação:', isMatch);
    if (!isMatch) return res.status(400).json({ message: 'Senha incorreta' });

    const payload = {
      userId: user._id,
      role: user.role,
      username: user.username,
      fullName: user.fullName,
      birthDate: user.birthDate,
      birthTime: user.birthTime,
      profileImage: user.profileImage // ← Corrigido para usar o nome do campo do modelo
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '5h' });

    res.status(200).json({
      message: 'Login bem-sucedido!',
      token,
      username: user.username,
      email: user.email,
      birthDate: user.birthDate,
      role: user.role,
      profileImgUrl: user.profileImgUrl
    });
  } catch (error) {
    console.error('Erro no login:', error);
    res.status(500).json({ message: 'Erro ao fazer login', error: error.message });
  }
});

router.post('/register', async (req, res) => {
  const { username, email, password, fullName } = req.body;

  try {
    // Verifica se já existe usuário com esse username
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username já cadastrado' });
    }

    // Cria um novo usuário com role padrão 'user'
    const newUser = new User({ username, email: email || '', password, role: 'user', fullName: fullName });

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

router.put('/update', authenticateToken(), async (req, res) => {
  const userId = req.user.userId;

  const {
    username,
    email,
    password,
    fullName,
    birthDate,
    birthTime,
    birthCity,
  } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    // Verifica se o novo username já existe e não pertence ao próprio usuário
    if (username && username !== user.username) {
      const existingUsername = await User.findOne({ username });
      if (existingUsername && existingUsername._id.toString() !== userId) {
        return res.status(400).json({ message: 'Username já está em uso' });
      }
      user.username = username;
    }

    // Verifica se o novo email já existe e não pertence ao próprio usuário
    if (email && email !== user.email) {
      const existingEmail = await User.findOne({ email });
      if (existingEmail && existingEmail._id.toString() !== userId) {
        return res.status(400).json({ message: 'Email já está em uso' });
      }
      user.email = email;
    }

    if (fullName !== undefined) user.fullName = fullName;
    if (birthDate !== undefined) user.birthDate = birthDate;
    if (birthTime !== undefined) user.birthTime = birthTime;
    if (birthCity !== undefined) user.birthCity = birthCity;

    if (password && password.trim() !== '') {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    await user.save();

    const { password: _, ...userWithoutPassword } = user.toObject();

    res.json({ message: 'Dados atualizados com sucesso!', user: userWithoutPassword });
  } catch (error) {
    console.error('Erro ao atualizar usuário:', error);
    res.status(500).json({ message: 'Erro interno ao atualizar dados', error: error.message });
  }
});

router.post('/validate-password', async (req, res) => {
  console.log('[validate-password] Requisição recebida para validar a senha.');
  const { username, password } = req.body;
  console.log('Recebido para validação de requisição:', { username, password });

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

    if (!isMatch) {
      // Se as senhas não conferem, retorna erro 401 - não autorizado
      return res.status(401).json({ message: 'Senha incorreta.' });
    }

    // Se tudo estiver correto, retorna sucesso
    console.log('[validate-password] Senha validada com sucesso.');
    return res.json({ success: true });
  } catch (error) {
    console.error('[validate-password] Erro ao validar a senha:', error);
    return res.status(500).json({ message: 'Erro ao validar senha', error });
  }
});

router.post('/uploadProfileImg', authenticateToken(), uploadProfileImage, async (req, res) => {
  try {
    const userId = req.user.userId;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'Usuário não encontrado' });

    user.profileImage = req.profileImgUrl;
    await user.save();

    res.status(200).json({
      message: 'Imagem de perfil atualizada com sucesso!',
      profileImage: req.profileImgUrl,
    });
  } catch (error) {
    console.error('Erro ao salvar imagem de perfil no banco:', error);
    res.status(500).json({ message: 'Erro interno ao atualizar imagem', error: error.message });
  }
});

module.exports = router;