const express = require('express');
const router = express.Router();
const Cursos = require('../../frontend/src/pages/Cursos');

// Rota para a página Cursos
router.get('/', (req, res) => {
    res.send('<Cursos />');
});

module.exports = router;
