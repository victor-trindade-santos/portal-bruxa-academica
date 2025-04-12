const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./config/db');
const articleRoutes = require('./routes/articleRoutes');

const app = express();
connectDB();

app.use(bodyParser.json());
app.use(cors());

app.use('/articles', articleRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
