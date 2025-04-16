const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./config/db');
const articleRoutes = require('./routes/articleRoutes');
const magiaRoutes = require('./routes/magiaRoutes');
const homeRoutes = require('./routes/homeRoutes');
const tarotRoutes = require('./routes/tarotRoutes');
const numerologiaRoutes = require('./routes/numerologiaRoutes');
const cursosRoutes = require('./routes/cursosRoutes');
const astrologiaRoutes = require('./routes/astrologiaRoutes');

const app = express();
connectDB();

app.use(bodyParser.json());
app.use(cors());

app.use('/articles', articleRoutes);
// app.use('/magia', magiaRoutes);
// app.use('/home', homeRoutes);
// app.use('/tarot', tarotRoutes);
// app.use('/numerologia', numerologiaRoutes);
// app.use('/cursos', cursosRoutes);
// app.use('/astrologia', astrologiaRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
