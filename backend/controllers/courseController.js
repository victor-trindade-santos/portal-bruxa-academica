const Course = require('../models/Course');

// Função para criar curso (acessível apenas para admin)
const createCourse = async (req, res) => {
  try {
    const { title, description } = req.body;
    const course = new Course({ title, description });
    await course.save();
    res.status(201).json(course);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar o curso', error: error.message });
  }
};

// Função para listar cursos (pode ser acessada por qualquer um)
const getCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao obter cursos', error: error.message });
  }
};

module.exports = { createCourse, getCourses };
