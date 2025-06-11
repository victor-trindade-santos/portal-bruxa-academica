const express = require('express');
const router = express.Router();

const authenticateToken = require('../middlewares/auth');

const { calculoPitagorico } = require("../controllers/numerologiaController");

router.post('/calculoPitagorico', authenticateToken(), calculoPitagorico);

module.exports = router;