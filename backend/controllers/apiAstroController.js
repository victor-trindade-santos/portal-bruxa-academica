const tzlookup = require("tz-lookup");
const { DateTime } = require("luxon");
const { gerarResumoMapaNatal } = require("../utils/astrologySummary");
const User = require("../models/User"); // certifique-se de importar o modelo User

require("dotenv").config();

const calcularMapaAstralNatal = async (req, res) => {
    try {
        const { birthDate, birthTime, birthCity } = req.body;
        const userId = req.user.userId;

        const cityEncoded = encodeURIComponent(birthCity);
        const nominatimUrl = `https://nominatim.openstreetmap.org/search?city=${cityEncoded}&country=Brazil&format=json`;
        const geoResponse = await fetch(nominatimUrl, {
            headers: { "User-Agent": "seu-app" },
        });

        const geoData = await geoResponse.json();
        if (!geoData || geoData.length === 0) {
            return res.status(400).json({ error: "Cidade não encontrada." });
        }

        const { lat, lon } = geoData[0];
        const timezone = tzlookup(parseFloat(lat), parseFloat(lon));

        const [hour, minute] = birthTime.split(":").map(Number);
        const birthDateObj = new Date(birthDate);

        const localDate = DateTime.fromObject(
            {
                year: birthDateObj.getFullYear(),
                month: birthDateObj.getMonth() + 1,
                day: birthDateObj.getDate(),
                hour,
                minute,
            },
            { zone: timezone }
        );

        const utcDate = localDate.toUTC();
        const utcDateArray = [
            utcDate.day,
            utcDate.month,
            utcDate.year,
            utcDate.hour,
            utcDate.minute,
        ];

        const locationArray = [parseFloat(lat), parseFloat(lon)];

        const planets = ["P0", "P1", "P2", "P3", "P4", "P5", "P6", "P7", "P8", "P9", "P10"];

        const astroResponse = await fetch("https://api.astrologico.org/v1/chart", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "e3a42b22145afa1b664cb497776da2765b171fc2588611653fc94220",
            },
            body: JSON.stringify({
                utcdate: utcDateArray,
                location: locationArray,
                planets,
                houses: [16]
            }),
        });

        const astroData = await astroResponse.json();

        if (astroData.status !== "OK") {
            return res.status(500).json({ error: "Erro ao gerar mapa astral", detail: astroData });
        }

        const resumo = gerarResumoMapaNatal(astroData);

        // Atualizar o usuário com os dados do mapa astral
        if (userId) {
            await User.findByIdAndUpdate(userId, {
                sunSign: resumo.sol.signo,
                sunDescription: resumo.sol.descricao,
                moonSign: resumo.lua.signo,
                moonDescription: resumo.lua.descricao,
                ascendantSign: resumo.ascendente.signo,
                ascendantDescription: resumo.ascendente.descricao,
                mapaCalculadoEm: new Date(),
            });
        }

        return res.status(200).json({
            metadata: astroData.metadata,
            planets: astroData.planets,
            houses: astroData.houses,
            resumo,
        });

    } catch (error) {
        console.error("Erro em calcularMapaAstralNatal:", error);
        return res.status(500).json({ error: "Erro interno no servidor", detail: error.message });
    }
};

const resumeMapaAstralNatal = async (req, res) => {
    try {
        const { mapaAstral } = req.body;
        const resumo = gerarResumoMapaNatal(mapaAstral);
        res.json(resumo);
    } catch (err) {
        res.status(500).json({ error: "Erro ao gerar resumo" });
    }
}

module.exports = { calcularMapaAstralNatal, resumeMapaAstralNatal };
