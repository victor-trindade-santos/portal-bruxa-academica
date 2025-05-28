// Função para calcular signo pela data
export function getSigno(birthDate) {
  const date = new Date(birthDate);
  if (isNaN(date)) return null;
  const day = date.getUTCDate();
  const month = date.getUTCMonth() + 1;

  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return signosData.find(s => s.nome === "Áries");
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return signosData.find(s => s.nome === "Touro");
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return signosData.find(s => s.nome === "Gêmeos");
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return signosData.find(s => s.nome === "Câncer");
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return signosData.find(s => s.nome === "Leão");
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return signosData.find(s => s.nome === "Virgem");
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return signosData.find(s => s.nome === "Libra");
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return signosData.find(s => s.nome === "Escorpião");
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return signosData.find(s => s.nome === "Sagitário");
  if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return signosData.find(s => s.nome === "Capricórnio");
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return signosData.find(s => s.nome === "Aquário");
  if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) return signosData.find(s => s.nome === "Peixes");

  return null;
}
