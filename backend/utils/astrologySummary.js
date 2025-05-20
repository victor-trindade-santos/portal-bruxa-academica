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

  return {
    sol,
    lua,
    ascendente,
    texto: `Seu signo solar é ${sol}, seu signo lunar é ${lua} e seu ascendente é ${ascendente}.`
  };
}

module.exports = { gerarResumoMapaNatal };