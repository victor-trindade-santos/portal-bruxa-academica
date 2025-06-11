const { calcularNumeroCaminhoVida } = require("../utils/numerologia");

const calculoPitagorico = (req, res) => {
    const birthDate = req.user.birthDate;
    if (!birthDate) return res.status(400).json({ erro: 'Data de nascimento não encontrada.' });

    const dataNascimento = new Date(birthDate).toISOString().split('T')[0];

    const numero = calcularNumeroCaminhoVida(dataNascimento);
    res.json({ numero });
};

module.exports = { calculoPitagorico };