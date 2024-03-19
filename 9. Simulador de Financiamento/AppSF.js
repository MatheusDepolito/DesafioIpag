import readline from 'readline';
import calcularFinanciamento from './SimuladorDeFinanciamento.js'

export default class AppSF {
    constructor() {
        this.readline = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
    }

    async execAppSimuladorFinanciamento() {
        let continuar = true;
        console.log(`Seja bem-vindo ao App Simulador de Financiamento, os cálculos são baseados na tabela price.`);
        
        while (continuar) {
            let opcao = parseInt(await this.prompt(`Digite 1 para iniciar a simulação ou 0 para sair.
            1 - Iniciar
            0 - Sair
            `));

            if (opcao !== 1) {
                continuar = false;
                break;
            }

            let valorFinanciamento = parseFloat(await this.prompt("Digite o valor do financiamento: "));
            let numParcelas = parseInt(await this.prompt("Digite o número de parcelas que deseja (1 a 12): "));
            let taxaJurosAnual = parseFloat(await this.prompt("Digite a taxa de juros Anual: "));

            calcularFinanciamento(valorFinanciamento, numParcelas, taxaJurosAnual);

            opcao = parseInt(await this.prompt(`Deseja fazer outra simulação?
            1 - Sim
            0 - Não
            `));

            if (opcao !== 1) {
                continuar = false;
            }
        }

        console.log("Obrigado por usar o Simulador de Financiamento. Até mais!");
        this.readline.close();
    }

    prompt(pergunta) {
        return new Promise((resolve) => {
            this.readline.question(pergunta, (resposta) => {
                resolve(resposta);
            });
        });
    }
}
