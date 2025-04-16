const express = require('express');
const router = express.Router();
const Home = require('../pages/Home');

// Rota para a página Home
router.get('/', (req, res) => {
    res.send('<Home />');
});

module.exports = router;
