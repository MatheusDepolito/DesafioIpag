const calcularFinanciamento = (valorFinanciamento, parcelas, taxaJurosAnual) => {
    // Verifica se os valores de entrada são válidos
    if (isNaN(valorFinanciamento) || isNaN(parcelas) || isNaN(taxaJurosAnual) ||
        valorFinanciamento <= 0 || parcelas <= 0 || taxaJurosAnual <= 0) {
        console.log('Por favor, insira valores válidos para o financiamento, número de parcelas e taxa de juros.');
        return;
    }

    // Convertendo a taxa de juros anual para mensal e decimal
    let taxaJurosMensal = taxaJurosAnual / 12 / 100;

    // Calculando o valor da parcela usando a fórmula da Tabela Price
    let valorParcela = (valorFinanciamento * taxaJurosMensal) /
    (1 - Math.pow(1 + taxaJurosMensal, -parcelas));

    // Calculando o custo efetivo total
    let cet = valorParcela * parcelas - valorFinanciamento;

    // Exibindo os resultados com as casas decimais cortadas
    console.log(`Valor da parcela: R$ ${Math.floor(valorParcela * 100) / 100}`);
    console.log(`Valor total a ser pago: R$ ${Math.floor(valorParcela * parcelas * 100) / 100}`);
    console.log(`Custo efetivo total do financiamento: R$ ${Math.floor(cet * 100) / 100}`);
    console.log(`Taxa efetiva mensal: ${Math.floor(taxaJurosMensal * 10000) / 100}%`);
}

export default calcularFinanciamento;
