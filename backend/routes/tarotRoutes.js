const express = require('express');
const router = express.Router();
const Tarot = require('../../frontend/src/pages/Tarot');

// Rota para a página Tarot
router.get('/', (req, res) => {
    res.send('<Tarot />');
});

module.exports = router;
