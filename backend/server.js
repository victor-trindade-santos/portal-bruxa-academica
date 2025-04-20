require('dotenv').config(); 
console.log('JWT_SECRET:', process.env.JWT_SECRET); 
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./config/db');
const articleRoutes = require('./routes/articleRoutes');
const courseRoutes = require('./routes/courseRoutes');
const authRoutes = require('./routes/auth');
const app = express();

connectDB();

app.use(bodyParser.json());
app.use(cors());

app.use('/articles', articleRoutes);
app.use('/auth', authRoutes);
app.use('/courses', courseRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
