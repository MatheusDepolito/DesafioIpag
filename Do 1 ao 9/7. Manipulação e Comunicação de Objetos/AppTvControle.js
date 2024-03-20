import readline from 'readline';
import Controle from './Controle.js';
import Tv from './Tv.js';



export default class AppTvControle {

    listaTvs;
    listaControles = [];
    tvSelecionada;
    controleSelecionado;

    constructor() {
        this.listaTvs = [new Tv("Samsung"), new Tv("LG"), new Tv("Sony")];
        this.listaControles = [new Controle("Samsung"), new Controle("LG"), new Controle("Sony")];
        this.readline = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
    }

    async execApp() {
        console.log("Bem-vindo ao App de Controle de TVs!");
        while (true) {
            console.log(`
            1 - Selecionar TV
            2 - Selecionar Controle
            3 - Ligar/Desligar TV
            0 - Sair
            `);
            const opcao = parseInt(await this.prompt("Escolha uma opção: "));
            switch (opcao) {
                case 1:
                    await this.selecionaTv();
                    break;
                case 2:
                    await this.selecionaControle();
                    break;
                case 3:
                    await this.ligarDesligarTv();
                    break;
                case 0:
                    console.log("Saindo do programa.");
                    this.readline.close();
                    return;
                default:
                    console.log("Opção inválida.");
                    break;
            }
        }
    }

    async selecionaTv() {
        console.log("Selecione uma TV:");
        this.listaTvs.forEach((tv, index) => {
            console.log(`${index + 1} - ${tv.marca}`);
        });
        const opcaoTv = parseInt(await this.prompt("Digite o número da TV desejada: "));
        if (opcaoTv >= 1 && opcaoTv <= this.listaTvs.length) {
            this.tvSelecionada = this.listaTvs[opcaoTv - 1];
            console.log(`TV da marca ${this.tvSelecionada.marca} selecionada.`);
        } else {
            console.log("Opção de TV inválida.");
        }
    }

    async selecionaControle() {
        console.log("Selecione um Controle:");
        this.listaControles.forEach((controle, index) => {
            console.log(`${index + 1} - ${controle.marca}`);
        });
        const opcaoControle = parseInt(await this.prompt("Digite o número do Controle desejado: "));
        if (opcaoControle >= 1 && opcaoControle <= this.listaControles.length) {
            this.controleSelecionado = this.listaControles[opcaoControle - 1];
            console.log(`Controle da marca ${this.controleSelecionado.marca} selecionado.`);
        } else {
            console.log("Opção de Controle inválida.");
        }
    }

    async ligarDesligarTv() {
        if (!this.tvSelecionada || !this.controleSelecionado) {
            console.log("Por favor, selecione uma TV e um Controle antes de ligar/desligar.");
            return;
        }

        if (this.tvSelecionada.validaControle(this.controleSelecionado.marca)) {
            this.tvSelecionada.ligaDesligaTv();
        } else {
            console.log("As marcas da TV e do Controle são distintas. Selecione um Controle compatível.");
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
