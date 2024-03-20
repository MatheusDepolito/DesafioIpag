import readline from 'readline';



export default class MaiorMenor {
    constructor() {
        this.readline = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
    }

    #maiorMenor(num1,num2,num3) {
        return Math.max(num1, num2, num3);
    }

    comparacao() {
        let continuar = true;
        const prompt = (pergunta) => {
            return new Promise((resolve) => {
                this.readline.question(pergunta, (resposta) => {
                    resolve(resposta);
                });
            });
        };


        (async () => {
            while(continuar) {
                let opcao = parseInt(await prompt(`Bem vindo à Maior e Menor. Maior e menor consiste em informar 3 números e será devolvido o maior entre eles, selecione em continuar ou sair:
                1 - Continuar
                0 - Sair
                `));
                switch (opcao) {
                    case 0:
                        continuar = false;
                        break;
                
                    case 1:
                        var num1 = parseFloat(await prompt("Informe o primeiro número:"));
                        var num2 = parseFloat(await prompt("Informe o segundo número:"));
                        var num3 = parseFloat(await prompt("Informe o terceiro número:"));
                        
                        console.log(`Resultado: Maior número entre eles é ${this.#maiorMenor(num1,num2,num3)}`);
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