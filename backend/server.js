require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./config/db');
const articleRoutes = require('./routes/articleRoutes');
const courseRoutes = require('./routes/courseRoutes');
const authRoutes = require('./routes/auth');
const mapaAstralRoutes = require("./routes/apiRouter");
const graficoRouter = require('./routes/graficoRouter');
const numerologiaRouter = require('./routes/numerologiaRouter');
const app = express();


connectDB();

app.use(cors({
    origin: true,  
    credentials: true,  
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS'
}));

app.options('*', cors({
    origin: true,
    credentials: true
}));


app.use(express.json()); // Para parsear o corpo das requisições JSON

// 2. Suas Rotas de API
// Exemplo de rota
app.get('/', (req, res) => {
    res.send('API Node.js está funcionando!');
});

app.get('/api/users', async (req, res) => {
    // Exemplo: Buscar usuários do MongoDB
    // const users = await User.find(); // Use seu modelo Mongoose aqui
    try {
        // Apenas para demonstração, simular uma busca
        res.json([{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }]);
    } catch (error) {
        console.error("Erro na rota /api/users:", error);
        res.status(500).json({ message: "Erro interno do servidor" });
    }
});

app.use(bodyParser.json());
// app.use(cors());

app.use('/articles', articleRoutes);

app.use('/auth', authRoutes);
app.use('/courses', courseRoutes);

app.use("/mapaAstral", mapaAstralRoutes);
app.use("/numerologia", numerologiaRouter)

app.use('/grafico', graficoRouter);

const PORT = process.env.PORT || 5000; // Use 5000 como fallback para desenvolvimento local
app.listen(PORT, () => {
    console.log(`Backend server rodando na porta ${PORT}`);
});