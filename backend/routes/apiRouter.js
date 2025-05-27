const express = require('express');
const router = express.Router();

const authenticateToken = require('../middlewares/auth');

const { calcularMapaAstralNatal, resumeMapaAstralNatal } = require("../controllers/apiAstroController");

router.post('/calcularMapaAstralNatal', authenticateToken(), calcularMapaAstralNatal);

router.post("/resumoMapaAstralNatal", resumeMapaAstralNatal);


module.exports = router;