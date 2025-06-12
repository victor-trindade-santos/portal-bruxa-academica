const { calcularNumeroCaminhoVida } = require("../utils/numerologia");
const User = require("../models/User");

const calculoPitagorico = async (req, res) => {
    const birthDate = req.body.birthDate;
    if (!birthDate) return res.status(400).json({ erro: 'Data de nascimento não encontrada.' });

    try {
        const dataNascimento = new Date(birthDate).toISOString().split('T')[0];
        const numero = calcularNumeroCaminhoVida(dataNascimento);

        if (req.user && req.user.userId) {
            console.log("teste")
            await User.findByIdAndUpdate(req.user.userId, {
                lifePathNumber: numero
            });
        }

        return res.json({ numero });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ erro: 'Erro ao calcular e salvar o número.' });
    }
};

module.exports = { calculoPitagorico };