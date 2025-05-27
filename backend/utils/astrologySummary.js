const astrologyDescriptions = require("../data/astrologyDescriptions");

const signos = [
    "Áries", "Touro", "Gêmeos", "Câncer", "Leão", "Virgem",
    "Libra", "Escorpião", "Sagitário", "Capricórnio", "Aquário", "Peixes"
];

function grauParaSigno(longitude) {
    const index = Math.floor(longitude / 30);
    return signos[index];
}

function gerarResumoMapaNatal(data) {
    const sol = grauParaSigno(data.planets.P0.longitude);
    const lua = grauParaSigno(data.planets.P1.longitude);
    const ascendente = grauParaSigno(data.metadata.date.ascendant);


    console.log(astrologyDescriptions)

    return {
        sol: {
            signo: sol,
            descricao: astrologyDescriptions.sun[sol]?.description || ""
        },
        lua: {
            signo: lua,
            descricao: astrologyDescriptions.moon[lua]?.description || ""
        },
        ascendente: {
            signo: ascendente,
            descricao: astrologyDescriptions.ascendant[ascendente]?.description || ""
        },
        textoResumido: `Seu signo solar é ${sol}, seu signo lunar é ${lua} e seu ascendente é ${ascendente}.`
    };
}

module.exports = { gerarResumoMapaNatal };
