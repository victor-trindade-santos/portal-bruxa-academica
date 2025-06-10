const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth');
const User = require('../models/User');

// Rota para buscar quantidade de usuários cadastrados por mês
router.get('/user-stats', authMiddleware('admin'), async (req, res) => {
  try {
    const stats = await User.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m", date: "$createdAt" } },
          total: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    res.json(stats);
  } catch (error) {
    console.error('Erro ao buscar estatísticas:', error);
    res.status(500).json({ error: 'Erro ao buscar estatísticas.' });
  }
});

module.exports = router;
