import readline from 'readline';

export default class Calculadora {
    constructor() {
        this.readline = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
    }

    #soma(num1, num2) {
        return num1 + num2;
    }

    #subtracao(num1, num2) {
        return num1 - num2;
    }

    #multiplicacao(num1, num2) {
        return num1 * num2;
    }

    #divisao(num1, num2) {
        return num1 / num2;
    }

    operacao() {
        let continuar = true;

        const prompt = (pergunta) => {
            return new Promise((resolve) => {
                this.readline.question(pergunta, (resposta) => {
                    resolve(resposta);
                });
            });
        };

        (async () => {
            while (continuar) {
                let opcao = parseInt(await prompt(`Bem-vindo à calculadora. Escolha uma operação:
                1 - Soma
                2 - Subtração
                3 - Multiplicação
                4 - Divisão
                0 - Sair    
                `));
                
                switch (opcao) {
                    case 0:
                        continuar = false;
                        break;
                    case 1:
                        var num1 = parseFloat(await prompt("Digite o primeiro número:"));
                        var num2 = parseFloat(await prompt("Digite o segundo número:"));
                        console.log(`Resultado: ${this.#soma(num1, num2)}`);
                        break;
                    case 2:
                        num1 = parseFloat(await prompt("Digite o primeiro número:"));
                        num2 = parseFloat(await prompt("Digite o segundo número:"));
                        console.log(`Resultado: ${this.#subtracao(num1, num2)}`);
                        break;
                    case 3:
                        num1 = parseFloat(await prompt("Digite o primeiro número:"));
                        num2 = parseFloat(await prompt("Digite o segundo número:"));
                        console.log(`Resultado: ${this.#multiplicacao(num1, num2)}`);
                        break;
                    case 4:
                        num1 = parseFloat(await prompt("Digite o primeiro número:"));
                        num2 = parseFloat(await prompt("Digite o segundo número:"));
                        console.log(`Resultado: ${this.#divisao(num1, num2)}`);
                        break;
                    default:
                        console.log("Opção inválida.");
                        break;
                }
            }
            this.readline.close();
        })();
    }
}
