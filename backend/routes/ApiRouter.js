const express = require('express');
const router = express.Router();

const { calcularMapaAstralNatal, resumeMapaAstralNatal } = require("../controllers/apiController");

router.post('/calcularMapaAstralNatal', calcularMapaAstralNatal);

router.post("/resumoMapaAstralNatal", resumeMapaAstralNatal);


module.exports = router;