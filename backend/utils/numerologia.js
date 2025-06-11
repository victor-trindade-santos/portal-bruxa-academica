function calcularNumeroCaminhoVida(dataString) {

    const numeros = dataString.replace(/-/g, '').split('').map(Number);

    let soma = numeros.reduce((acc, val) => acc + val, 0);

    while (![11, 22, 33].includes(soma) && soma > 9) {
        soma = soma.toString().split('').map(Number).reduce((a, b) => a + b, 0);
    }

    return soma;
}

module.exports = { calcularNumeroCaminhoVida };