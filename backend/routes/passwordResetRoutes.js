const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { sendPasswordResetEmail } = require('../models/emailService');

router.post('/api/forgot-password', async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: 'Nenhum usuário cadastrado com este email.' });
  }

  const token = Math.floor(100000 + Math.random() * 900000).toString();
  user.resetToken = token;
  user.resetTokenExpiration = Date.now() + 15 * 60 * 1000;

  await user.save();

  try {
    await sendPasswordResetEmail(email, token);
    res.json({ message: 'Código enviado com sucesso.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao enviar email.' });
  }
});


router.post('/api/reset-password', async (req, res) => {
  const { email, token, newPassword } = req.body;

  const user = await User.findOne({
    email,
    resetToken: token,
    resetTokenExpiration: { $gt: Date.now() }
  });

  if (!user) {
    return res.status(400).json({ message: 'Token inválido ou expirado.' });
  }

  const bcrypt = require('bcryptjs');
  user.password = await bcrypt.hash(newPassword, 10);
  user.resetToken = null;
  user.resetTokenExpiration = null;

  await user.save();

  res.json({ message: 'Senha atualizada com sucesso.' });
});

// Rota para validar token
router.post('/api/validate-reset-token', async (req, res) => {
  const { email, token } = req.body;
  const user = await User.findOne({
    email,
    resetToken: token,
    resetTokenExpiration: { $gt: Date.now() }
  });
  if (user) {
    res.json({ valid: true });
  } else {
    res.json({ valid: false });
  }
});


module.exports = router;
