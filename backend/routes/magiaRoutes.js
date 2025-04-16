const express = require('express');
const router = express.Router();
const Magia = require('../pages/Magia');

// Rota para a página Magia
router.get('/', (req, res) => {
    res.send('<Magia />');
});

module.exports = router;
