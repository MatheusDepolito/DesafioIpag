import readline from 'readline';

export default class JogoDaAdivinhacao {
    constructor() {
        this.readline = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
    }

    #numeroAleatorio;

    #geraNumeroAleatorio() {
        this.#numeroAleatorio = Math.floor(Math.random() * 100 + 1);
    }

    #verificaNumeroAleatorio(numeroDigitado) {
        if (this.#numeroAleatorio < numeroDigitado) {
            console.log("O número é menor.");
        } else if (this.#numeroAleatorio > numeroDigitado) {
            console.log("O número é maior.");
        } else if(this.#numeroAleatorio === numeroDigitado) {
            console.log("Parabéns, você acertou!!!");
        }
        else {
            console.log("valor inválido digite outro:");
        }
    }

    async jogoAdv() {
        var continuar = true;

        while (continuar) {
            let opcao = parseInt(await this.prompt(`Bem-vindo ao jogo da adivinhação. Sorteamos um número de 1 a 100. Você deve chutar um número e tentar adivinhar.
                1 - Continuar
                0 - Sair
            `));

            switch (opcao) {
                case 0:
                    continuar = false;
                    break;
                case 1:
                    continuar = await this.iniciarRodada();
                    break;
                default:
                    console.log("Opção inválida.");
                    break;
            }
        }

        this.readline.close();
    }

    async iniciarRodada() {
        let acertou = false;

        this.#geraNumeroAleatorio();
        console.log("Sorteamos um número aleatório de 1 a 100.");
        while (!acertou) {
            
            let numeroDigitado = parseInt(await this.prompt("Digite um número do 1 ao 100:"));
            this.#verificaNumeroAleatorio(numeroDigitado);

            if (this.#numeroAleatorio === numeroDigitado) {
                acertou = true;
                let opcao = parseInt(await this.prompt(`Você acertou! Deseja jogar novamente?
                    1 - Sim
                    0 - Não
                `));

                if (!opcao) {
                    acertou = true;
                    return false;
                } else {
                    console.log("Sorteamos um número aleatório de 1 a 100.");
                    this.#geraNumeroAleatorio();
                    acertou = false;
                }
            }
        }
    }

    prompt(pergunta) {
        return new Promise((resolve) => {
            this.readline.question(pergunta, (resposta) => {
                resolve(resposta);
            });
        });
    }
}
