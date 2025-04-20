const express = require('express');
const router = express.Router();
const { createCourse, getCourses } = require('../controllers/courseController');
const authMiddleware = require('../middlewares/auth');

// Criar curso (protegido por autenticação e só para admin)
router.post('/', authMiddleware('admin'), createCourse); 

// Obter cursos (acesso público)
router.get('/', getCourses);

module.exports = router;
